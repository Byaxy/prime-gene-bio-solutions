import { useEffect, useState } from "react";
import { Product, Stock } from "../Types";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  MenuItem,
  Popover,
  Select,
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
import dayjs, { Dayjs } from "dayjs";

type FormInput = Omit<Stock, "id" | "createdAt">;

const columns = [
  "Name",
  "Lot No.",
  "Adjust Type",
  "Avail. Qnty",
  "Adjust By Qnty",
  "New Qnty",
];
const AdjustExistingStock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([
    ...products,
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);
  const [lotNumber, setLotNumber] = useState<string>("");
  const [lotNumberID, setLotNumberID] = useState<string>("");
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [adjustType, setAdjustType] = useState<string>("add");
  const [adjustQnty, setAdjustQnty] = useState<number>(0);
  const [newQnty, setNewQnty] = useState<number>(0);

  const { register, handleSubmit, reset, formState } = useForm<FormInput>();
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  // handle product select
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setAnchorEl(null);
  };

  // handle lot number select
  const handleSelectLotNumber = (stock: Stock) => {
    setLotNumberID(stock.id);
    setLotNumber(stock.lotNumber);
    setAvailableQuantity(stock.quantity);
    setManufactureDate(dayjs(stock.manufactureDate));
    setExpiryDate(dayjs(stock.expiryDate));
  };

  // Open popover when "select product" button is clicked
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle popover close
  const handleClose = () => {
    setSearchTerm("");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      if (!selectedProduct) {
        toast.error("Please select a product to continue");
        return;
      }
      if (!lotNumber) {
        toast.error("Please select a Lot Number to continue");
        return;
      }
      const productID = selectedProduct.id;
      const selectedStockObj = selectedProduct.stock.find(
        (stock) => stock.id === lotNumberID
      );
      const updatedStockObj = {
        ...selectedStockObj,
        quantity: newQnty,
        manufactureDate,
        expiryDate,
        updatedAt: new Date(),
      };
      const stock = selectedProduct.stock.filter(
        (stock) => stock.id !== lotNumberID
      );
      const updatedStock = [{ ...updatedStockObj }, ...stock];
      const newData = {
        stock: [...updatedStock],
        updatedAt: new Date(),
      };
      const response = await axios.patch(
        `http://localhost:5000/products/${productID}`,
        newData
      );
      if (response.status === 200) {
        toast.success("Stock Updated succefully");
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
      setSelectedProduct(null);
      setManufactureDate(null);
      setExpiryDate(null);
      handleClose();
    }
  }, [isSubmitSuccessful, reset]);

  // Filter/search products
  useEffect(() => {
    let searchedProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchedProducts);
  }, [products, searchTerm]);

  // Fetch all currently registered products
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

  // Calculate new Quantinty depending on the adjust type.
  useEffect(() => {
    if (adjustType === "sub") {
      const qnty = availableQuantity - adjustQnty;
      setNewQnty(qnty);
    } else if (adjustType === "add") {
      const qnty = availableQuantity + adjustQnty;
      setNewQnty(qnty);
    }
  }, [adjustQnty, adjustType, availableQuantity]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 pt-10">
          <span className="text-xl text-primaryDark font-bold block">
            Adjust Stock Details (Existing Lot Number)
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

          {/** Display selected product's details to adjust if stock is available */}
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
                {selectedProduct && selectedProduct?.stock.length !== 0 ? (
                  <TableRow className="h-[5px]">
                    <TableCell className="text-primaryDark font-semibold text-lg">
                      {selectedProduct.name}
                    </TableCell>
                    <TableCell className="text-primaryDark">
                      <Select label="Lot No." defaultValue={""}>
                        {selectedProduct.stock.map((item) => (
                          <MenuItem
                            key={item.lotNumber}
                            value={item.lotNumber}
                            onClick={() => handleSelectLotNumber(item)}
                          >
                            {item.lotNumber}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.lotNumber && (
                        <span className="text-redColor text-sm block mt-1">
                          {errors.lotNumber?.message}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Select label="Adjust Type" defaultValue="add">
                        <MenuItem
                          key="add"
                          value="add"
                          onClick={() => setAdjustType("add")}
                        >
                          Add
                        </MenuItem>
                        <MenuItem
                          key="sub"
                          value="sub"
                          onClick={() => setAdjustType("sub")}
                        >
                          Sub
                        </MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell className="text-lg">
                      <TextField
                        type="number"
                        value={availableQuantity}
                        defaultValue={selectedProduct?.stock[0]?.quantity}
                        className="max-w-[80px]"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        className="max-w-[80px]"
                        inputProps={{ min: 0 }}
                        defaultValue={0}
                        onChange={(e) =>
                          setAdjustQnty(parseInt(e.target.value))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={newQnty}
                        className="max-w-[80px]"
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-lg text-primaryDark"
                    >
                      {selectedProduct?.stock.length === 0
                        ? "No Items To Display. Add New Stock"
                        : "No Items To Display"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/** Display selected product's Manufacture and Expiry Dates to adjust if stock is available */}
          {selectedProduct && selectedProduct?.stock.length !== 0 ? (
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <label>
                  <span className="text-primaryDark font-semibold">
                    Manufacture Date
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                <DatePicker
                  defaultValue={dayjs()}
                  value={manufactureDate}
                  onChange={(newDate) => setManufactureDate(newDate)}
                  format="LL"
                  label="MM-DD-YYYY"
                  disableFuture={true}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label>
                  <span className="text-primaryDark font-semibold">
                    Expiry Date
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                <DatePicker
                  defaultValue={dayjs()}
                  value={expiryDate}
                  onChange={(newDate) => setExpiryDate(newDate)}
                  format="LL"
                  label="MM-DD-YYYY"
                />
              </div>
            </div>
          ) : null}

          <div className="w-full flex flex-row items-center justify-end gap-4">
            <Button
              variant="contained"
              onClick={() => setSelectedProduct(null)}
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

export default AdjustExistingStock;
