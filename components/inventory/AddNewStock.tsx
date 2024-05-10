import { useEffect, useState } from "react";
import { Product, Stock } from "../Types";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { generateId } from "../utils";

const defaultValues: Stock = {
  id: generateId(),
  lotNumber: "",
  manufactureDate: new Date(),
  expiryDate: new Date(),
  quantity: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const columns = [
  "Name",
  "Lot No.",
  "Quantity",
  "Manufacture Date",
  "Expiry Date",
];

const AddNewStock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([
    ...products,
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [manufactureDate, setManufactureDate] = useState<Date | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<Stock>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  // handle product selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setAnchorEl(null);
  };

  // handle popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // cancel
  const handleClose = () => {
    setSearchTerm("");
    setSelectedProduct(null);
    setAnchorEl(null);
  };

  // open popover
  const open = Boolean(anchorEl);

  // Submit form data
  const onSubmit = async (data: Stock) => {
    try {
      if (!selectedProduct) {
        toast.error("Please select a product to continue");
        return;
      }
      const productID = selectedProduct.id;
      const newData = {
        stock: [
          ...selectedProduct.stock,
          { ...data, manufactureDate, expiryDate },
        ],
        updatedAt: new Date(),
      };
      const response = await axios.patch(
        `http://localhost:5000/products/${productID}`,
        newData
      );
      if (response.status === 200) {
        console.log(newData);
        toast.success("Stock Add succefully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setManufactureDate(null);
      setExpiryDate(null);
      handleClose();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    let searchedProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchedProducts);
  }, [products, searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 pt-10">
          <span className="text-xl text-primaryDark font-bold block">
            Add New Stock (New Lot Number)
          </span>
          {/** Select product to adjust */}
          <div>
            <label htmlFor="products">
              <span className="text-primaryDark font-semibold text-lg">
                Select Product
              </span>
              <span className="text-redColor"> *</span>
            </label>
            <Button
              variant="outlined"
              size="large"
              className="w-full flex flex-row items-center justify-between max-w-2xl mt-2"
              onClick={handleClick}
            >
              <span className="text-gray-400 capitalize sm:text-lg">
                Select product
              </span>
              {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
            </Button>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="min-w-[672px] flex flex-col gap-5 p-5">
              <TextField
                type="text"
                size="small"
                placeholder="Search products by Name or Code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Table size="small">
                <TableHead>
                  <TableRow className="bg-primaryColor font-semibold text-lg">
                    <TableCell className="text-white text-lg w-32">
                      Code
                    </TableCell>
                    <TableCell className="text-white text-lg">Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="overflow-y-scroll">
                  {filteredProducts.map((product, index) => (
                    <TableRow
                      key={product.id + index}
                      onClick={() => handleSelectProduct(product)}
                      className="cursor-pointer hover:bg-grayColor"
                    >
                      <TableCell className="text-primaryDark text-lg">
                        {product.code}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Popover>

          {/** Display selected product's details to adjust */}
          <div className="w-full">
            <Table>
              <TableHead>
                <TableRow className="bg-primaryColor">
                  {columns.map((column, index) => (
                    <TableCell
                      key={column + index}
                      className="text-white font-semibold text-[16px]"
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProduct ? (
                  <TableRow className="h-[5px]">
                    <TableCell className="text-primaryDark font-semibold text-lg">
                      {selectedProduct.name}
                    </TableCell>
                    <TableCell className="text-primaryDark">
                      <TextField
                        id="name"
                        type="text"
                        label="Lot Number"
                        {...register("lotNumber", {
                          required: "Lot Number is required",
                        })}
                      />
                      {errors.lotNumber && (
                        <span className="text-redColor text-sm block mt-1">
                          {errors.lotNumber?.message}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-lg">
                      <TextField
                        type="number"
                        className="max-w-[80px]"
                        inputProps={{ min: 0 }}
                        {...register("quantity", {
                          required: "Quantity is required",
                          valueAsNumber: true,
                        })}
                      />
                      {errors.quantity && (
                        <span className="text-redColor text-sm block mt-1">
                          {errors.quantity?.message}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        value={manufactureDate}
                        onChange={(newDate) => setManufactureDate(newDate)}
                        format="LL"
                        label="MM-DD-YYYY"
                        disableFuture={true}
                      />
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        value={expiryDate}
                        onChange={(newDate) => setExpiryDate(newDate)}
                        format="LL"
                        label="MM-DD-YYYY"
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-lg text-primaryDark"
                    >
                      No Items To Display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="w-full flex flex-row items-center justify-end gap-4">
            <Button
              variant="contained"
              onClick={handleClose}
              className="cancelBtn"
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              size="large"
              disabled={isSubmitting}
              className="saveBtn"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewStock;
