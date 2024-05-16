import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import type { Product, Inventory } from "../Types";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { DB, query, ID } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

type FormInput = Omit<
  Inventory,
  "id" | "createdAt" | "updatedAt" | "productName" | "unit"
>;

type AddStockProps = {
  open: boolean;
  handleClose: () => void;
};
const defaultValues: FormInput = {
  lotNumber: "",
  manufactureDate: null,
  expiryDate: null,
  quantity: 0,
  cost: 0,
  price: 0,
};

const AddStock = ({ open, handleClose }: AddStockProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([
    ...products,
  ]);

  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues,
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // Submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = {
        ...data,
        manufactureDate,
        expiryDate,
        product: product?.id,
      };

      await DB.createDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId,
        ID.unique(),
        formData
      ).then(() => {
        toast.success("Stock Added Succefully");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // open popover
  const openPopover = Boolean(anchorEl);

  // handle product selection
  const handleSelectProduct = (product: Product) => {
    setProduct(product);
    setAnchorEl(null);
  };

  // handle open popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // close popover
  const handleClosePopover = () => {
    setSearchTerm("");
    setAnchorEl(null);
  };

  // handle reset
  const handleReset = useCallback(() => {
    reset();
    setProduct(null);
    setManufactureDate(null);
    setExpiryDate(null);
    setAnchorEl(null);
  }, [reset]);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteProductsCollectionId,
          query
        );
        const products = documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          code: doc.code,
          image: doc.image,
          brand: doc.brand ? doc.brand.name : null,
          type: doc.type ? doc.type.name : null,
          unit: doc.unit ? doc.unit.code : null,
          category: doc.category ? doc.category.name : null,
          inventory: doc.inventory,
          description: doc.description,
          alertQuantity: doc.alertQuantity,
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));

        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [products]);

  // search
  useEffect(() => {
    let searchedProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchedProducts);
  }, [products, searchTerm]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      handleReset();
    }
  }, [handleClose, handleReset, isSubmitSuccessful]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add New Stock
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 flex flex-col gap-5 w-full">
              {/** Select product to adjust */}
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="products">
                    <span className="text-primaryDark font-semibold text-lg">
                      Select Product
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <Button
                    variant="outlined"
                    size="large"
                    className="w-full flex flex-row items-center justify-between"
                    onClick={handleClick}
                  >
                    <span className="block text-gray-400 capitalize sm:text-lg !py-1">
                      Select product
                    </span>
                    {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                  </Button>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="productName">
                    <span className="text-primaryDark font-semibold">
                      Product Name
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="productName"
                    type="text"
                    value={product?.name}
                    placeholder="Product Name"
                    disabled
                  />
                </div>
              </div>
              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className="min-w-[300px] flex flex-col gap-5 p-5">
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
                        <TableCell className="hidden sm:block text-white text-lg w-32">
                          Code
                        </TableCell>
                        <TableCell className="text-white text-lg">
                          Name
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="overflow-y-scroll">
                      {filteredProducts.map((product, index) => (
                        <TableRow
                          key={product.id + index}
                          onClick={() => handleSelectProduct(product)}
                          className="cursor-pointer hover:bg-grayColor"
                        >
                          <TableCell className="hidden sm:block text-primaryDark text-lg">
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
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="lotNumber">
                    <span className="text-primaryDark font-semibold">
                      Lot Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="lotNumber"
                    type="text"
                    label="Lot Number"
                    {...register("lotNumber", {
                      required: "Lot Number is required",
                    })}
                    error={!!errors.lotNumber}
                    helperText={errors.lotNumber?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="quantity">
                    <span className="text-primaryDark font-semibold">
                      Quantity
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="quantity"
                    type="number"
                    label="Quantity"
                    inputProps={{ min: 0 }}
                    {...register("quantity", {
                      required: "Quantity is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="cost">
                    <span className="text-primaryDark font-semibold">
                      Cost Price
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="cost"
                    type="number"
                    label="Cost Price"
                    inputProps={{ min: 0 }}
                    {...register("cost", {
                      required: "Cost Price is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.cost}
                    helperText={errors.cost?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="price">
                    <span className="text-primaryDark font-semibold">
                      Selling Price
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="price"
                    type="number"
                    label="Selling Price"
                    inputProps={{ min: 0 }}
                    {...register("price", {
                      required: "Selling Price is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel>
                    <span className="text-primaryDark font-semibold">
                      Manufacture Date
                    </span>
                  </FormLabel>
                  <DatePicker
                    value={manufactureDate}
                    onChange={(newDate) => setManufactureDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    disableFuture={true}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel>
                    <span className="text-primaryDark font-semibold">
                      Expiry Date
                    </span>
                  </FormLabel>
                  <DatePicker
                    value={expiryDate}
                    onChange={(newDate) => setExpiryDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                  />
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={handleReset}
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            className="saveBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddStock;
