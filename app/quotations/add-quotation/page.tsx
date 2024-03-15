"use client";

import { useCallback, useEffect, useState } from "react";
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
import type { Quotation, SaleProduct } from "@/components/Types";
import type { Product } from "@/components/Types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { customersData } from "@/data/customersData";
import { allProductsData } from "@/data/allProductsData";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { quotationStatus } from "@/components/constants";

type FormInput = Omit<Quotation, "id" | "updatedAt" | "isActive">;
type Options = {
  label: string;
  value: string;
};

const tax: number = 10;

const customers: Options[] = customersData.map((customer) => ({
  label: customer.name,
  value: customer.name,
}));

const defaultValues: FormInput = {
  quotationNumber: "",
  customer: "",
  tax: tax,
  subTotal: 0,
  total: 0,
  quotationStatus: "",
  products: [],
  notes: "",
  createdAt: new Date(),
};

export default function AddQuotationPage() {
  const [quotationDate, setQuotationDate] = useState<Dayjs | null>(dayjs());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([
    ...allProductsData,
  ]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [quotationProducts, setQuotationProducts] = useState<SaleProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);

  const handleCloseModal = () => {
    setSelectedProduct(null);
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
    let searchedProducts = allProductsData.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchedProducts);
  }, [searchTerm]);

  const handleAddProduct = (product: Product) => {
    setQuotationProducts([
      ...quotationProducts,
      {
        id: product.id,
        name: product.name,
        code: product.code,
        quantity: quantity,
        lotNumber: product.stock[0].lotNumber,
        price: product.price,
        subTotal: product.price * quantity,
        availableQuantity: availableQuantity,
      },
    ]);

    toast.success("Product added successfully");
    handleCloseModal();
  };

  const handleDeleteProduct = (index: number) => {
    let newQuotationProducts = [...quotationProducts];
    newQuotationProducts.splice(index, 1);
    setQuotationProducts(newQuotationProducts);

    toast.success("Product deleted successfully");
  };

  const getTotal = (quotationProducts: SaleProduct[]): number =>
    quotationProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.subTotal,
      0
    );

  const getGrandTotal = (total: number, tax: number): number =>
    (total * tax) / 100 + total;

  const getTaxAmount = (total: number, tax: number): number =>
    (total * tax) / 100;

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      if (quotationProducts.length === 0) {
        toast.error("Please add atleast one products");
        return;
      }

      const newData = {
        ...data,
        products: [...quotationProducts],
        subTotal: total,
        tax: taxAmount,
        total: grandTotal,
      };

      formData.append("json", JSON.stringify(newData));
      const response = await fetch("/api/quotation/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const result = await response.json();
      toast.success("Quotation added successfully");
      return result;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong try again later");
    }
  };

  useEffect(() => {
    let total = getTotal(quotationProducts);
    setTotal(total);
    let taxAmount = getTaxAmount(total, tax);
    setTaxAmount(taxAmount);
    let grandTotal = getGrandTotal(total, tax);
    setGrandTotal(grandTotal);
  }, [quotationProducts]);

  // Reset form to defaults on Successfull submission of data

  const handleReset = () => {
    setQuotationProducts([]);
    setTotal(0);
    setTaxAmount(0);
    setGrandTotal(0);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setQuotationProducts([]);
      setTotal(0);
      setTaxAmount(0);
      setGrandTotal(0);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const columns = [
    "No.",
    "Name",
    "Unit Price",
    "Quantity",
    "Sub Total",
    "Actions",
  ];

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
          Add Quotation
        </Typography>
        <Button
          onClick={router.back}
          variant="outlined"
          className="flex flex-row items-center justify-center gap-1"
        >
          <ArrowBackIcon />
          <span className="text-primaryDark font-medium capitalize sm:text-lg">
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
                value={quotationDate}
                onChange={(newDate) => setQuotationDate(newDate)}
                format="LL"
                label="MM-DD-YYYY"
                disableFuture={true}
                minDate={dayjs("01-01-2000")}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="invoiceNumber">
                <span className="text-primaryDark font-semibold">
                  Quotation Number
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="quotationNumber"
                type="text"
                label="Quotation Number"
                variant="outlined"
                {...register("quotationNumber", {
                  required: "Quotation Number is required",
                })}
              />
              {errors.quotationNumber && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.quotationNumber?.message}
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
                options={customers}
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
                vertical: "bottom",
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
                      <TableCell className="text-white text-lg w-24">
                        Code
                      </TableCell>
                      <TableCell className="text-white text-lg">Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
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
                maxWidth="md"
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
                        {columns.map((column, index) => (
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
                          <TableCell width={40} className="text-primaryDark">
                            1.
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            {selectedProduct.code} - {selectedProduct.name}
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            {selectedProduct.price}
                          </TableCell>
                          <TableCell className="text-lg">
                            <TextField
                              type="number"
                              size="small"
                              className="max-w-[80px]"
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

          <Table size="small" className="w-full">
            <TableHead className="bg-primaryColor w-full">
              <TableRow>
                {columns.map((column, index) => (
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
              {quotationProducts ? (
                <>
                  {quotationProducts.map((product, index) => (
                    <TableRow key={index + product.id}>
                      <TableCell
                        className="text-primaryDark text-lg"
                        width={40}
                      >
                        {index + 1}.
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        <span>{product.name}</span>
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-primaryDark text-lg">
                        {product.quantity}
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
                    <TableCell rowSpan={3} colSpan={3}></TableCell>
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
          <div className="flex flex-col gap-2 w-full md:max-w-sm mt-5">
            <label>
              <span className="text-primaryDark font-semibold">
                Quotation Status
              </span>
              <span className="text-redColor"> *</span>
            </label>
            <FormInputDropdown
              id="quotationStatus"
              control={control}
              label="Select Status"
              options={quotationStatus}
              {...register("quotationStatus", {
                required: "Quotation Status is required",
              })}
            />
            {errors.quotationStatus && (
              <span className="text-redColor text-sm -mt-1">
                {errors.quotationStatus?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 ">
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
              className="font-bold bg-redColor/95 hover:bg-redColor"
              onClick={() => handleReset()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              className="font-bold"
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
