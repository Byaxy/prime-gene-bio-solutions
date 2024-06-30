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
  FormLabel,
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
  Code,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { paymentStatus } from "@/components/constants";
import { saleStatus } from "@/components/constants";
import { DB, query, ID, Query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";

type FormInput = Omit<Sale, "id" | "createdAt" | "updatedAt">;

const tax: number = 0;

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
  tax: 0,
  subTotal: 0,
  total: 0,
  paid: 0,
  paymentStatus: "",
  saleStatus: "",
  products: [],
  notes: "",
};

export default function AddSalePage() {
  const [saleDate, setSaleDate] = useState<Dayjs | null>(dayjs());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lotNumber, setLotNumber] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
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

  // table columns
  const columns = [
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
      name: "Lot No.",
      selector: (row: { lotNumber: string }) => row.lotNumber,
      width: "120px",
    },
    {
      name: "Quantity",
      cell: (row: { quantity: number; unit: string }) => (
        <span>
          {row.quantity} {row.unit}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Unit Price",
      cell: (row: { price: number }) => <span>${row.price}</span>,
      width: "120px",
    },
    {
      name: "Sub Total",
      cell: (row: { subTotal: number }) => <span>${row.subTotal}</span>,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row: SaleProduct) => (
        <Button
          variant="contained"
          size="small"
          className="bg-redColor/95 hover:bg-redColor p-1 text-white font-bold"
          onClick={() => handleDeleteProduct(row)}
        >
          Delete
        </Button>
      ),
      width: "120px",
    },
  ];

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

  // fetch products and customer options
  useEffect(() => {
    // fetch products
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

    // fetch customer options
    const fetchCustomerOptions = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCustomersCollectionId,
          query
        );
        const customerOptions = documents.map((doc: any) => ({
          value: doc.$id,
          label: doc.name,
        }));

        setCustomerOptions(customerOptions);
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

    let pdct = saleProducts.find(
      (item) => item.id === product?.id && item.lotNumber === lotNumber
    );

    if (pdct) {
      toast.error("Product is already on the list. Delete it to make changes");
      handleCloseModal();
      return;
    }

    setSaleProducts([
      ...saleProducts,
      {
        id: ID.unique(),
        name: product.name,
        code: product.code,
        unit: product.unit,
        quantity: quantity,
        lotNumber: lotNumber,
        price: price,
        subTotal: price * quantity,
      },
    ]);

    toast.success("Product added successfully");
    handleCloseModal();
  };

  // delete product TO DO: make it more efficcient.
  const handleDeleteProduct = (product: SaleProduct) => {
    let newSaleProducts = [...saleProducts];
    newSaleProducts.splice(newSaleProducts.indexOf(product), 1);
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

      const products = saleProducts.map((product) => ({
        name: product.name,
        code: product.code,
        lotNumber: product.lotNumber,
        unit: product.unit,
        quantity: product.quantity,
        price: product.price,
        subTotal: product.subTotal,
      }));

      const formData = {
        ...data,
        products: [...products],
        subTotal: total,
        tax: taxAmount,
        total: grandTotal,
      };

      await DB.createDocument(
        config.appwriteDatabaseId,
        config.appwriteSalesCollectionId,
        ID.unique(),
        formData
      ).then(() => {
        toast.success("Sale added successfully");
      });
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
              <FormLabel>
                <span className="text-primaryDark font-semibold">Date</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
              <FormLabel htmlFor="invoiceNumber">
                <span className="text-primaryDark font-semibold">
                  Invoice Number
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
              <FormLabel htmlFor="customer">
                <span className="text-primaryDark font-semibold">Customer</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
            <FormLabel>
              <span className="text-primaryDark font-semibold">Products</span>
              <span className="text-redColor"> *</span>
            </FormLabel>

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
                              {selectedProduct.inventory.map((item) => (
                                <MenuItem
                                  key={item.lotNumber}
                                  value={item.lotNumber}
                                  onClick={() => (
                                    setLotNumber(item.lotNumber),
                                    setAvailableQuantity(item.quantity),
                                    setPrice(item.price)
                                  )}
                                >
                                  {item.lotNumber}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            {availableQuantity} {selectedProduct.unit}
                          </TableCell>
                          <TableCell className="text-primaryDark">
                            ${price}
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
                            <span>{price * Math.max(1, quantity)}</span>
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

          <div className="w-full py-6">
            <DataTable
              columns={columns}
              data={saleProducts}
              customStyles={customTableStyles}
            />
            <div className="flex w-full justify-end pt-8">
              <div className="w-[400px] grid grid-cols-1 gap-5">
                <div className="grid grid-cols-3 gap-5">
                  <span className="text-primaryDark font-bold text-lg col-span-2">
                    Sub Total
                  </span>
                  <span className="text-primaryDark font-bold text-lg">
                    ${total}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <span className="text-primaryDark font-bold text-lg">
                    Tax
                  </span>
                  <span>{tax}%</span>
                  <span className="text-primaryDark font-bold text-lg">
                    ${taxAmount}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <span className="text-primaryDark font-bold text-lg col-span-2">
                    Grand Total
                  </span>
                  <span className="text-primaryDark font-bold text-lg">
                    ${grandTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <FormLabel htmlFor="purchaseOrderNumber">
                <span className="text-primaryDark font-semibold">
                  Purchase Order No
                </span>
              </FormLabel>
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
              <FormLabel htmlFor="paymentStatus">
                <span className="text-primaryDark font-semibold">
                  Payment Status
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
              <FormLabel htmlFor="saleStatus">
                <span className="text-primaryDark font-semibold">
                  Sale Status
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
            <FormLabel htmlFor="paid">
              <span className="text-primaryDark font-semibold">
                Amount Paid
              </span>
              <span className="text-redColor"> *</span>
            </FormLabel>
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
            <FormLabel htmlFor="notes">
              <span className="text-primaryDark font-semibold">Notes</span>
            </FormLabel>
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
