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
  Option,
  Purchase,
  PurchaseProduct,
  Supplier,
  Unit,
} from "@/components/Types";
import { customTableStyles } from "@/styles/TableStyles";
import axios from "axios";
import toast from "react-hot-toast";
import { deliveryStatus } from "@/components/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  quotationStatus as purchaseStatus,
  paymentStatus,
} from "@/components/constants";
import { generateId } from "../utils";

type FormInput = Omit<Purchase, "id">;

const dialogColumns = [
  "Lot Number",
  "Product Name",
  "Qty Requested",
  "Qty Supplied",
];

const defaultValues: FormInput = {
  date: new Date(),
  purchaseOrderNumber: "",
  supplier: "",
  total: 0,
  paid: 0,
  paymentStatus: "",
  purchaseStatus: "",
  products: [],
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

type AddPurchaseProps = {
  open: boolean;
  handleClose: () => void;
};

const AddPurchase = ({ open, handleClose }: AddPurchaseProps) => {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<PurchaseProduct[]>([]);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [suppliers, setSuppliers] = useState<Option[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [units, setUnits] = useState<Unit[]>([]);

  // product details state
  const [name, setName] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);

  const columns = [
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Lot Number",
      selector: (row: { lotNumber: string }) => row.lotNumber,
      width: "160px",
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
      name: "Price",
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
      cell: (row: { id: string }) => [
        <span
          key={"delete" + row.id}
          onClick={() => handleDelete(row.id)}
          className="text-redColor py-1 px-2 hover:bg-white hover:rounded-md transition"
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

  // open model
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // close model
  const handleCloseModal = () => {
    setQuantity(0);
    setOpenModal(false);
  };

  // calculate sub total and total
  useEffect(() => {
    setSubTotal(quantity * price);
    setTotal(products.reduce((acc, item) => acc + item.subTotal, 0));
  }, [quantity, price, products]);

  // delete product
  const handleDelete = (id: string) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  // add product to list of delivered products
  const handleAddProduct = () => {
    const newProduct: PurchaseProduct = {
      id: generateId(),
      lotNumber,
      name,
      unit,
      quantity,
      price,
      subTotal,
    };
    setProducts([newProduct, ...products]);
    setQuantity(0);
    setPrice(0);
    setSubTotal(0);
    setLotNumber("");
    setName("");
    setUnit("");
    handleCloseModal();
  };

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = {
        ...data,
        products,
        total,
        date,
      };
      const response = await axios.post(
        "http://localhost:5000/purchases",
        formData
      );

      if (response.status === 201) {
        toast.success("Purchase Added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancel = useCallback(() => {
    reset();
    setProducts([]);
  }, [reset]);

  useEffect(() => {
    // fetch suppliers
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        if (response.status === 200) {
          let options = response.data.map((supplier: Supplier) => ({
            label: supplier.name,
            value: supplier.name,
          }));
          setSuppliers(options);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();

    // fetch units
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://localhost:5000/units");
        if (response.status === 200) {
          setUnits(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnits();
  }, []);

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
            Add Purchase
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
                      Purchase Date
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <DatePicker
                    defaultValue={dayjs()}
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    minDate={dayjs("01-01-2000")}
                    disableFuture
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="purchaseStatus">
                    <span className="text-primaryDark font-semibold">
                      Purchase Status
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <FormInputDropdown
                    id="purchaseStatus"
                    name="purchaseStatus"
                    control={control}
                    label="Purchase Status"
                    options={purchaseStatus}
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="purchaseOrderNumber">
                    <span className="text-primaryDark font-semibold">
                      Purchase Order Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="purchaseOrderNumber"
                    type="text"
                    label="Purchase Order Number"
                    {...register("purchaseOrderNumber", {
                      required: "Purchase Order Number is required",
                    })}
                    error={!!errors.purchaseOrderNumber}
                    helperText={errors.purchaseOrderNumber?.message}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="supplier">
                    <span className="text-primaryDark font-semibold">
                      Supplier
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <FormInputDropdown
                    id="supplier"
                    name="supplier"
                    control={control}
                    label="Supplier"
                    options={suppliers}
                  />
                </div>
              </div>

              <Button
                variant="contained"
                onClick={handleOpenModal}
                size="large"
                disabled={openModal}
                className="saveBtn py-2 text-lg"
              >
                Add Product to Purchase
              </Button>

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
                  data={products}
                  columns={columns}
                  customStyles={customTableStyles}
                />
              </div>

              <div className="flex flex-row gap-14 items-center justify-end pb-5 pr-5">
                <span className="text-primaryDark font-semibold text-xl">
                  Toatal Amount:
                </span>
                <span className="text-primaryDark font-semibold text-xl">
                  ${total}
                </span>
              </div>

              {/** Confirm quantity supplied for each product */}
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
              >
                <DialogTitle className="flex justify-between items-center">
                  <span className="text-2xl text-primaryDark font-bold">
                    Add Product details
                  </span>
                  <CancelIcon
                    fontSize="large"
                    className="text-primaryDark cursor-pointer"
                    onClick={handleCloseModal}
                  />
                </DialogTitle>
                <DialogContent>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-5">
                      <div className="flex w-full gap-5">
                        <div className="flex flex-col flex-1 gap-4">
                          <label htmlFor="name">
                            <span className="text-primaryDark font-semibold">
                              Name
                            </span>
                            <span className="text-redColor"> *</span>
                          </label>
                          <TextField
                            id="name"
                            type="text"
                            label="Name"
                            variant="outlined"
                            required
                            onChange={(e) => setName(e.target.value)}
                            helperText="Name is required"
                          />
                        </div>
                        <div className="flex flex-col flex-1 gap-4">
                          <label htmlFor="lotNumber">
                            <span className="text-primaryDark font-semibold">
                              Lot Number
                            </span>
                            <span className="text-redColor"> *</span>
                          </label>
                          <TextField
                            id="lotNumber"
                            type="text"
                            label="Lot Number"
                            variant="outlined"
                            onChange={(e) => setLotNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex w-full gap-5">
                        <div className="flex flex-col flex-1 gap-4">
                          <label htmlFor="paymentSatatus">
                            <span className="text-primaryDark font-semibold">
                              Unit
                            </span>
                            <span className="text-redColor"> *</span>
                          </label>
                          <div className="w-full">
                            <Select
                              label="Invoice Number"
                              id="invoiceNumber"
                              value={unit}
                              onChange={(event: SelectChangeEvent) =>
                                setUnit(event.target.value)
                              }
                              sx={{ width: "100%" }}
                            >
                              {units.map((item) => (
                                <MenuItem key={item.id} value={item.code}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-4">
                          <label htmlFor="quantity">
                            <span className="text-primaryDark font-semibold">
                              Quantity
                            </span>
                            <span className="text-redColor"> *</span>
                          </label>
                          <TextField
                            id="quantity"
                            type="number"
                            label="Quantity"
                            variant="outlined"
                            required
                            inputProps={{ min: 1 }}
                            defaultValue={1}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value))
                            }
                            helperText="Quantity is required and must be greater than 0"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex w-full gap-5">
                        <div className="flex flex-col flex-1 gap-4">
                          <label htmlFor="price">
                            <span className="text-primaryDark font-semibold">
                              Price
                            </span>
                            <span className="text-redColor"> *</span>
                          </label>
                          <TextField
                            id="price"
                            type="number"
                            label="Price"
                            variant="outlined"
                            required
                            inputProps={{ min: 1 }}
                            defaultValue={1}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            helperText="Quantity is required and must be greater than 0"
                          />
                        </div>
                        <div className="flex flex-col flex-1 gap-4">
                          <label htmlFor="subTotal">
                            <span className="text-primaryDark font-semibold">
                              Sub Total
                            </span>
                            <span className="text-redColor"> *</span>
                          </label>
                          <TextField
                            id="subTotal"
                            type="number"
                            label="Sub Total"
                            variant="outlined"
                            disabled
                            value={subTotal}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                    onClick={handleAddProduct}
                    className="font-bold bg-primaryColor/95 hover:bg-primaryColor transition text-white capitalize"
                  >
                    Add Product
                  </Button>
                </DialogActions>
              </Dialog>
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="paymentStatus">
                    <span className="text-primaryDark font-semibold">
                      Payment Status
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <FormInputDropdown
                    id="paymentStatus"
                    name="paymentStatus"
                    control={control}
                    label="Payment Status"
                    options={paymentStatus}
                  />
                </div>

                <div className="flex flex-col flex-1 gap-4">
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
                    variant="outlined"
                    {...register("paid", {
                      required:
                        "Amount paid is required and should be less than or equal to total amount",
                      valueAsNumber: true,
                      min: 0,
                      max: total,
                      validate: (value) => value <= total,
                    })}
                    error={!!errors.paid}
                    helperText={errors.paid?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="description">
                  <span className="text-primaryDark font-semibold">
                    Description
                  </span>
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
};

export default AddPurchase;
