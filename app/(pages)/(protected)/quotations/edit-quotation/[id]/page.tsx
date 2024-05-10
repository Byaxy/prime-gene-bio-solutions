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
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { Customer, Quotation, SaleProduct } from "@/components/Types";
import type { Product } from "@/components/Types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { quotationStatus } from "@/components/constants";
import type { Option } from "@/components/Types";
import axios from "axios";
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";

type FormInput = Omit<Quotation, "id" | "createdAt" | "isActive">;

const tax: number = 0;

export default function EditQuotationPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<
    Product | SaleProduct | null
  >(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [quotationProducts, setQuotationProducts] = useState<SaleProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [customers, setCustomers] = useState<Option[]>([]);
  const [quotation, setQuotation] = useState<Quotation>({} as Quotation);

  const params = useParams();

  const defaultValues: FormInput = {
    quotationNumber: quotation.quotationNumber,
    customer: quotation.customer,
    tax: quotation.tax,
    subTotal: quotation.subTotal,
    total: quotation.total,
    quotationStatus: quotation.quotationStatus,
    products: quotation.products,
    notes: quotation.notes,
    updatedAt: new Date(),
  };

  // Fetch Quotation to be edited
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/quotations/${params?.id}`
        );
        setQuotation(data);
        setQuotationProducts(data.products);
        setTotal(data.subTotal);
        setTaxAmount(data.tax);
        setGrandTotal(data.total);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotation();
  }, [params?.id]);

  const dialogColumns = [
    "Code",
    "Name",
    "Unit Price",
    "Quantity",
    "Sub Total",
    "Actions",
  ];

  const tableColumns = [
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
      width: "120px",
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Unit Price",
      cell: (row: { price: number }) => <span>${row.price}</span>,
      width: "180px",
    },
    {
      name: "Quantity",
      cell: (row: { quantity: number; unit: string }) => (
        <span>
          {row.quantity}
          {row.unit}
        </span>
      ),
      width: "180px",
    },
    {
      name: "Sub Total",
      cell: (row: { subTotal: number }) => <span>${row.subTotal}</span>,
      width: "180px",
    },
    {
      name: "Actions",
      cell: (row: SaleProduct) => [
        <span
          key={"edit" + row.id}
          onClick={() => handleOpenModal(row)}
          className="text-[#475BE8] py-1 px-2 cursor-pointer hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
        <span
          key={"delete" + row.id}
          onClick={() => handleDeleteProduct(row.id)}
          className="text-redColor cursor-pointer py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <DeleteIcon />
        </span>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setAvailableQuantity(0);
    setOpenModal(false);
  };

  const handleOpenModal = (product: Product | SaleProduct) => {
    setSelectedProduct(product);
    setAnchorEl(null);
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

  // search products
  useEffect(() => {
    let searchedProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchedProducts);
  }, [products, searchTerm]);

  // Fetch products
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
  }, [products]);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/customers");
        const data = response.data.map((customer: Customer) => ({
          label: customer.name,
          value: customer.name,
        }));
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddProduct = (product: Product | SaleProduct) => {
    if ("stock" in product) {
      let exits = quotationProducts.find((item) => item.id === product.id);
      if (exits) {
        toast.error(
          "Product is already on the list. Delete it to make changes"
        );
        handleCloseModal();
        return;
      }
      setQuotationProducts([
        {
          id: product.id,
          name: product.name,
          code: product.code,
          unit: product.unit,
          quantity: quantity,
          lotNumber: product?.stock[0]?.lotNumber,
          price: product.price,
          subTotal: product.price * quantity,
          availableQuantity: availableQuantity,
        },
        ...quotationProducts,
      ]);
    }

    if ("lotNumber" in product) {
      let products = quotationProducts.filter((item) => item.id !== product.id);
      setQuotationProducts([
        {
          id: product.id,
          name: product.name,
          code: product.code,
          unit: product.unit,
          quantity: quantity,
          lotNumber: product.lotNumber,
          price: product.price,
          subTotal: product.price * quantity,
          availableQuantity: availableQuantity,
        },
        ...products,
      ]);
    }

    toast.success("Product added successfully");
    handleCloseModal();
  };

  const handleDeleteProduct = (id: string) => {
    let products = [...quotationProducts];
    let updatedProducts = products.filter((product) => product.id !== id);
    setQuotationProducts(updatedProducts);

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

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      if (quotationProducts.length === 0) {
        toast.error("Please add atleast one products");
        return;
      }

      const formData = {
        ...data,
        products: [...quotationProducts],
        subTotal: total,
        tax: taxAmount,
        total: grandTotal,
      };

      const response = await axios.patch(
        `http://localhost:5000/quotations/${params?.id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Quotation Edited successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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

  // Reset form to defaults
  const handleReset = useCallback(() => {
    setQuotationProducts(quotation.products);
    setTotal(quotation.subTotal);
    setTaxAmount(quotation.tax);
    setGrandTotal(quotation.total);
    reset();
  }, [
    quotation.products,
    quotation.subTotal,
    quotation.tax,
    quotation.total,
    reset,
  ]);

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
          Edit Quotation
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
                defaultValue={dayjs(quotation.createdAt)}
                format="LL"
                label="MM-DD-YYYY"
                disabled
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
                defaultValue={quotation.quotationNumber}
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
                defaultValue={quotation.customer}
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
                    Edit Product Details
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
                          <TableCell className="text-primaryDark text-[17px]">
                            {selectedProduct.code}
                          </TableCell>
                          <TableCell className="text-primaryDark text-[17px] font-semibold">
                            {selectedProduct.name}
                          </TableCell>
                          <TableCell className="text-primaryDark text-[17px]">
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
                            className="text-center text-lg text-primaryDark font-semibold"
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
                    size="large"
                    onClick={handleCloseModal}
                    className="font-bold bg-redColor/95 hover:bg-redColor transition text-white capitalize"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleAddProduct(selectedProduct!)}
                    className="font-bold bg-primaryColor/95 hover:bg-primaryColor transition text-white capitalize"
                  >
                    Add Product
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div>
            <DataTable
              data={quotationProducts}
              columns={tableColumns}
              customStyles={viewTableStyles}
              className="scrollbar-hide"
              pagination
            />
          </div>
          {quotationProducts.length !== 0 && (
            <div className="flex flex-col gap-4 px-5 py-6 border-t-2 border-grayColor">
              <div className="flex flex-row items-center justify-end gap-14">
                <span className="text-primaryDark font-bold text-xl">
                  Total
                </span>
                <span className="text-primaryDark font-bold text-xl">
                  ${total}
                </span>
              </div>
              <div className="flex flex-row items-center justify-end gap-24">
                <span className="text-primaryDark font-bold text-xl">Tax</span>
                <span className="text-primaryDark font-bold text-xl">
                  ${taxAmount}
                </span>
              </div>
              <div className="flex flex-row items-center justify-end gap-14">
                <span className="text-primaryDark font-bold text-xl">
                  Grand Total
                </span>
                <span className="text-primaryDark font-bold text-xl">
                  ${grandTotal}
                </span>
              </div>
            </div>
          )}
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
              defaultValue={quotation.quotationStatus}
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
              defaultValue={quotation.notes}
              {...register("notes")}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              size="large"
              className="cancelBtn"
              onClick={() => handleReset()}
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
