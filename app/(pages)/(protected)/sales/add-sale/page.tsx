"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type {
  Customer,
  Option,
  Sale,
  SaleProduct,
  Product,
} from "@/components/Types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { paymentStatus } from "@/components/constants";
import { saleStatus } from "@/components/constants";
import axios from "axios";

type FormInput = Omit<Sale, "id">;

const tax: number = 0;

const InvoiceColumns = [
  "Code",
  "Name",
  "Lot No.",
  "Unit Price",
  "Quantity",
  "Sub Total",
  "Actions",
];
const dialogColumns = [
  "Name",
  "Lot No.",
  "Available Qnty",
  "Unit Price",
  "Quantity",
  "Sub Total",
  "Actions",
];

const defaultValues: FormInput = {
  invoiceNumber: "",
  purchaseOrderNumber: "",
  customer: "",
  tax: tax,
  subTotal: 0,
  total: 0,
  paid: 0,
  paymentStatus: "",
  saleStatus: "",
  products: [],
  notes: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

export default function AddSalePage() {
  const [saleDate, setSaleDate] = useState<Dayjs | null>(dayjs());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lotNumber, setLotNumber] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([
    ...products,
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [customerOptions, setCustomerOptions] = useState<Option[]>([]);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setLotNumber("");
    setQuantity(1);
    setAvailableQuantity(0);
    setOpenModal(false);
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedProduct(null);
    setLotNumber("");
    setQuantity(1);
    setAvailableQuantity(0);
    setOpenModal(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const router = useRouter();
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

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

    const fetchCustomerOptions = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/customers");
        const options = data.map((option: Customer) => ({
          label: option.name,
          value: option.name,
        }));

        setCustomerOptions(options);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomerOptions();
  }, [products, customerOptions]);

  // add product to list of sold products
  const handleAddProduct = (product: Product) => {
    if (!lotNumber) {
      toast.error("Please select lot number");
      return;
    }

    if (quantity > availableQuantity) {
      toast.error("Insufficient quantity in stock");
    }

    setSaleProducts([
      ...saleProducts,
      {
        id: product.id,
        name: product.name,
        code: product.code,
        unit: product.unit,
        quantity: quantity,
        lotNumber: lotNumber,
        price: product.price,
        subTotal: product.price * quantity,
        availableQuantity: availableQuantity,
      },
    ]);

    toast.success("Product added successfully");
    handleCloseModal();
  };

  const handleDeleteProduct = (index: number) => {
    let newSaleProducts = [...saleProducts];
    newSaleProducts.splice(index, 1);
    setSaleProducts(newSaleProducts);

    toast.success("Product deleted successfully");
  };

  // calculate total
  const getTotal = (saleProducts: SaleProduct[]): number =>
    saleProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.subTotal,
      0
    );

  // calculate grand total
  const getGrandTotal = (total: number, tax: number): number =>
    (total * tax) / 100 + total;

  // calculate tax amount
  const getTaxAmount = (total: number, tax: number): number =>
    (total * tax) / 100;

  // Submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      if (saleProducts.length === 0) {
        toast.error("Please add atleast one product");
        return;
      }

      const newData = {
        ...data,
        products: [...saleProducts],
        subTotal: total,
        tax: taxAmount,
        total: grandTotal,
      };

      const response = await axios.post("http://localhost:5000/sales", newData);
      if (response.status === 201) {
        toast.success("Sale added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    let total = getTotal(saleProducts);
    setTotal(total);
    let taxAmount = getTaxAmount(total, tax);
    setTaxAmount(taxAmount);
    let grandTotal = getGrandTotal(total, tax);
    setGrandTotal(grandTotal);
  }, [saleProducts]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      setSaleProducts([]);
      setTotal(0);
      setTaxAmount(0);
      setGrandTotal(0);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="bg-white w-full rounded-lg shadow-md px-5 pt-5 pb-8">
      <div className="flex items-center justify-between w-full gap-5">
        <Typography
          variant="h3"
          sx={{
            color: "#232a58",
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          Add Sale
        </Typography>
        <Button
          onClick={router.back}
          variant="contained"
          className="flex flex-row items-center justify-center gap-1 bg-primaryColor/95 text-white hover:bg-primaryColor"
        >
          <ArrowBackIcon />
          <span className="text-white font-medium capitalize sm:text-lg">
            Back
          </span>
        </Button>
      </div>
      <div className="h-[2px] bg-mainColor w-full mt-5 mb-10 sm:mb-16 opacity-20" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">Date</span>
                <span className="text-redColor"> *</span>
              </label>
              <DatePicker
                defaultValue={dayjs()}
                value={saleDate}
                onChange={(newDate) => setSaleDate(newDate)}
                format="LL"
                label="MM-DD-YYYY"
                disableFuture={true}
                minDate={dayjs("01-01-2000")}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="invoiceNumber">
                <span className="text-primaryDark font-semibold">
                  Invoice Number
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="invoiceNumber"
                type="text"
                label="Invoice Number"
                variant="outlined"
                {...register("invoiceNumber", {
                  required: "Invoice Number is required",
                })}
              />
              {errors.invoiceNumber && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.invoiceNumber?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">Customer</span>
                <span className="text-redColor"> *</span>
              </label>
              <FormInputDropdown
                id="customer"
                control={control}
                label="Select Customer"
                options={customerOptions}
                {...register("customer", { required: "Customer is required" })}
              />
              {errors.customer && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.customer?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="products">
              <span className="text-primaryDark font-semibold">Products</span>
              <span className="text-redColor"> *</span>
            </label>

            <Button
              variant="outlined"
              size="large"
              className="w-full flex flex-row items-center justify-between max-w-2xl"
              onClick={handleClick}
            >
              <span className="text-gray-400 capitalize sm:text-lg">
                Select product
              </span>
              {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
            </Button>
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
                        onClick={() => handleOpenModal(product)}
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
            <div>
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="lg"
                fullWidth
              >
                <DialogTitle className="flex justify-between items-center">
                  <span className="text-xl text-primaryDark font-bold">
                    Add Product Details
                  </span>
                  <CancelIcon
                    fontSize="medium"
                    className="text-primaryDark cursor-pointer"
                    onClick={handleCloseModal}
                  />
                </DialogTitle>
                <DialogContent>
                  <Table size="small">
                    <TableHead>
                      <TableRow className="bg-primaryColor">
                        {dialogColumns.map((column, index) => (
                          <TableCell
                            key={column + index}
                            className="text-white font-semibold last:hidden"
                          >
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProduct ? (
                        <TableRow>
                          <TableCell className="text-primaryDark font-semibold">
                            {selectedProduct.code} - {selectedProduct.name}
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            <Select
                              size="small"
                              label="Lot No."
                              defaultValue={""}
                            >
                              {selectedProduct.stock.map((item) => (
                                <MenuItem
                                  key={item.lotNumber}
                                  value={item.lotNumber}
                                  onClick={() => (
                                    setLotNumber(item.lotNumber),
                                    setAvailableQuantity(item.quantity)
                                  )}
                                >
                                  {item.lotNumber}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            {availableQuantity}
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            {selectedProduct.price}
                          </TableCell>
                          <TableCell className="text-lg">
                            <TextField
                              type="number"
                              size="small"
                              className="max-w-[60px]"
                              inputProps={{ min: 1 }}
                              defaultValue={1}
                              onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                              }
                            />
                          </TableCell>
                          <TableCell className="text-lg text-primaryDark">
                            <span>
                              {selectedProduct.price * Math.max(1, quantity)}
                            </span>
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
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleCloseModal}
                    className="font-bold bg-redColor/95 hover:bg-redColor transition text-white capitalize"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleAddProduct(selectedProduct!)}
                    className="font-bold bg-primaryColor/95 hover:bg-primaryColor transition text-white capitalize"
                  >
                    Add Product
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          <Table size="small">
            <TableHead>
              <TableRow className="bg-primaryColor">
                {InvoiceColumns.map((column, index) => (
                  <TableCell
                    key={index + column}
                    className="text-white font-semibold text-lg"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {saleProducts ? (
                <>
                  {saleProducts.map((product, index) => (
                    <TableRow key={index + product.id}>
                      <TableCell className="text-primaryDark text-lg font-semibold">
                        {product.code}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.lotNumber}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.quantity} {product.unit}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.subTotal}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        <Button
                          variant="contained"
                          size="small"
                          className="bg-redColor/95 hover:bg-redColor text-white font-bold"
                          onClick={() => handleDeleteProduct(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={4}></TableCell>
                    <TableCell
                      className="text-primaryDark font-bold text-lg pt-8"
                      colSpan={2}
                    >
                      Total
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg pt-8">
                      ${total}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      Tax
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      {tax}%
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      ${taxAmount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="text-primaryDark font-bold text-lg"
                      colSpan={2}
                    >
                      Grand Total
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      ${grandTotal}
                    </TableCell>
                  </TableRow>
                </>
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

          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="purchaseOrderNumber">
                <span className="text-primaryDark font-semibold">
                  Purchase Order No
                </span>
              </label>
              <TextField
                id="purchaseOrderNumber"
                type="text"
                label="Purchase Order Number"
                variant="outlined"
                {...register("purchaseOrderNumber")}
              />
              {errors.purchaseOrderNumber && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.purchaseOrderNumber?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">
                  Payment Status
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <FormInputDropdown
                id="paymentStatus"
                control={control}
                label="Select Payment Status"
                options={paymentStatus}
                {...register("paymentStatus", {
                  required: "Payment Status is required",
                })}
              />
              {errors.paymentStatus && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.paymentStatus?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">
                  Sale Status
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <FormInputDropdown
                id="saleStatus"
                control={control}
                label="Select Sale Status"
                options={saleStatus}
                {...register("saleStatus", {
                  required: "Sale Status is required",
                })}
              />
              {errors.saleStatus && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.saleStatus?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:w-1/3">
            <label htmlFor="paid">
              <span className="text-primaryDark font-semibold">
                Amount Paid
              </span>
              <span className="text-redColor"> *</span>
            </label>
            <TextField
              id="paid"
              type="number"
              label="Amount Paid"
              inputProps={{ min: 0 }}
              variant="outlined"
              {...register("paid", {
                required: "Amount Paid is required",
                valueAsNumber: true,
                max: {
                  value: grandTotal,
                  message: "Amount paid cannot be greater than grand total",
                },
              })}
            />
            {errors.paid && (
              <span className="text-redColor text-sm -mt-1">
                {errors.paid?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="notes">
              <span className="text-primaryDark font-semibold">Notes</span>
            </label>
            <TextField
              id="notes"
              label="Notes"
              multiline
              rows={6}
              {...register("notes")}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              size="large"
              className="cancelBtn"
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              className="saveBtn"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
