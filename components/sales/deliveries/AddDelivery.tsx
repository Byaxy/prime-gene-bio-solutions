import React, { useCallback, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import DataTable from "react-data-table-component";
import type {
  DeliveryProduct,
  Delivery,
  Sale,
  SaleProduct,
} from "@/components/Types";
import { customTableStyles } from "@/styles/TableStyles";
import axios from "axios";
import toast from "react-hot-toast";
import { deliveryStatus } from "@/components/constants";
import EditIcon from "@mui/icons-material/Edit";

type FormInput = Omit<Delivery, "id">;

const dialogColumns = [
  "Lot Number",
  "Product Name",
  "Qty Requested",
  "Qty Supplied",
];

const defaultValues: FormInput = {
  date: new Date(),
  saleInvoiceNumber: "",
  deliveryReferenceNumber: "",
  description: "",
  customer: "",
  address: "",
  products: [],
  status: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

type AddDeliveryProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddDelivery({ open, handleClose }: AddDeliveryProps) {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [sales, setSales] = useState<Sale[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | null>(dayjs());
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [products, setProducts] = useState<DeliveryProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DeliveryProduct>(
    {} as DeliveryProduct
  );
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);

  const columns = [
    {
      name: "Lot Number",
      selector: (row: { lotNumber: string }) => row.lotNumber,
      width: "120px",
    },
    {
      name: "Product Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Qnty Requested",
      selector: (row: { quantityRequested: number }) => row.quantityRequested,
      width: "150px",
      style: {
        display: "flex",
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    {
      name: "Qnty Supplied",
      selector: (row: { quantitySupplied: number }) => row.quantitySupplied,
      width: "140px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
    {
      name: "Actions",
      cell: (row: DeliveryProduct) => [
        <span
          onClick={() => handleOpenModal(row)}
          key={"edit" + row.id}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  // open model
  const handleOpenModal = (product: DeliveryProduct) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  // close model
  const handleCloseModal = () => {
    setSelectedProduct({} as DeliveryProduct);
    setOpenModal(false);
  };

  // add product to list of delivered products
  const handleAddProduct = (product: DeliveryProduct) => {
    if (quantity > product.quantityRequested) {
      toast.error("You cannot Supply more items than requested");
      return;
    }

    // remove selected product from list.
    let remainingProducts = products.filter(
      (item) => item.id !== product.id && item.lotNumber !== product.lotNumber
    );
    // updated products list
    let updatedProducts = [
      {
        ...product,
        quantitySupplied: quantity,
      },
      ...remainingProducts,
    ];
    setProducts(updatedProducts);
    setQuantity(0);
    toast.success("Product added successfully");
    handleCloseModal();
  };

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = {
        ...data,
        date: deliveryDate,
        saleInvoiceNumber: invoiceNumber,
        customer,
        products,
      };
      const response = await axios.post(
        "http://localhost:5000/deliveries",
        formData
      );

      if (response.status === 201) {
        toast.success("Delivery Added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancel = useCallback(() => {
    reset();
    setInvoiceNumber("");
    setCustomer("");
    setProducts([]);
    setDeliveryDate(dayjs());
  }, [reset]);

  // Fetch sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sales");
        setSales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSales();
  }, [sales]);

  useEffect(() => {
    const sale = sales.find((sale) => sale.invoiceNumber === invoiceNumber);
    if (sale) {
      setCustomer(sale.customer);

      let products: DeliveryProduct[] = [];
      sale.products.forEach((product: SaleProduct) => {
        products.push({
          ...product,
          quantityRequested: product.quantity,
          quantitySupplied: 0,
        });
      });
      setProducts(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceNumber]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      handleCancel();
      handleClose();
    }
  }, [handleCancel, handleClose, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Delivery
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
            <div className="flex flex-col gap-5 w-full">
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="deliveryDate">
                    <span className="text-primaryDark font-semibold">
                      Delivery Date
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <DatePicker
                    defaultValue={dayjs()}
                    value={deliveryDate}
                    onChange={(newDate) => setDeliveryDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    minDate={dayjs("01-01-2000")}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="category">
                    <span className="text-primaryDark font-semibold">
                      Status
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <FormInputDropdown
                    id="status"
                    name="status"
                    control={control}
                    label="Delivery Status"
                    options={deliveryStatus}
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Delivery Reference Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="deliveryReferenceNumber"
                    type="text"
                    label="Reference Number"
                    {...register("deliveryReferenceNumber", {
                      required: "Delivery Reference Number is required",
                    })}
                    error={!!errors.deliveryReferenceNumber}
                    helperText={errors.deliveryReferenceNumber?.message}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Sale Invoice Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <div className="w-full">
                    <Select
                      label="Invoice Number"
                      id="invoiceNumber"
                      value={invoiceNumber}
                      {...register("saleInvoiceNumber", {
                        required: "Invoice Number is required",
                      })}
                      error={!!errors.saleInvoiceNumber}
                      onChange={(event: SelectChangeEvent) =>
                        setInvoiceNumber(event.target.value)
                      }
                      sx={{ width: "100%" }}
                    >
                      {sales.map((item) => (
                        <MenuItem key={item.id} value={item.invoiceNumber}>
                          {item.invoiceNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="customer">
                    <span className="text-primaryDark font-semibold">
                      Customer
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="customer"
                    type="text"
                    label="Customer"
                    variant="outlined"
                    value={customer}
                    disabled
                  />
                </div>

                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="address">
                    <span className="text-primaryDark font-semibold">
                      Address
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="address"
                    type="text"
                    label="Address"
                    variant="outlined"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </div>
              </div>
              {/** Select product */}
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="products">
                  <span className="text-primaryDark font-semibold">
                    Products
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                {/** List of products delivered */}
                <DataTable
                  columns={columns}
                  data={products}
                  customStyles={customTableStyles}
                  noDataComponent={
                    <div className="w-full text-center text-primaryDark font-semibold">
                      No Products To Display
                    </div>
                  }
                />
              </div>

              {/** Confirm quantity supplied for each product */}
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
              >
                <DialogContent>
                  <Table size="small">
                    <TableHead>
                      <TableRow className="bg-primaryColor">
                        {dialogColumns.map((column, index) => (
                          <TableCell
                            key={column + index}
                            className="text-white font-semibold"
                          >
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProduct ? (
                        <TableRow>
                          <TableCell className="text-primaryDark font-semibold text-[17px]">
                            {selectedProduct.lotNumber}
                          </TableCell>
                          <TableCell className="text-primaryDark font-semibold text-[17px]">
                            {selectedProduct.name}
                          </TableCell>

                          <TableCell className="text-primaryDark text-[17px] text-center">
                            {selectedProduct.quantityRequested}
                          </TableCell>
                          <TableCell className="text-lg text-primaryDark text-center">
                            <TextField
                              type="number"
                              size="small"
                              className="max-w-[60px]"
                              inputProps={{
                                min: 0,
                                max: selectedProduct.quantityRequested,
                              }}
                              defaultValue={0}
                              onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                              }
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

              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="description">
                  <span className="text-primaryDark font-semibold">Notes</span>
                </label>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={6}
                  {...register("description")}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCancel}
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            disabled={isSubmitting}
            className="saveBtn"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
