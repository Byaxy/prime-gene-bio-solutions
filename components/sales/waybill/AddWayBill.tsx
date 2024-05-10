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
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import type { Delivery, DeliveryProduct, WayBill } from "@/components/Types";
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";
import axios from "axios";
import toast from "react-hot-toast";

// TO DO - update typee to Way Bill type
type FormInput = Omit<WayBill, "id">;

const defaultValues: FormInput = {
  date: new Date(),
  deliveryReferenceNumber: "",
  customer: "",
  address: "",
  products: [],
  description: "",
  amount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

type AddWayBillProps = {
  open: boolean;
  handleClose: () => void;
};
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
    name: "Qty Requested",
    selector: (row: { quantityRequested: number }) => row.quantityRequested,
    width: "150px",
    style: {
      display: "flex",
      justifyContent: "center",
      fontWeight: "bold",
    },
  },
  {
    name: "Qty Supplied",
    selector: (row: { quantitySupplied: number }) => row.quantitySupplied,
    width: "140px",
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
  {
    name: "Balance Left",
    selector: (row: { quantitySupplied: number; quantityRequested: number }) =>
      row.quantityRequested - row.quantitySupplied,
    width: "140px",
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
];

export default function AddWayBill({ open, handleClose }: AddWayBillProps) {
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [customer, setCustomer] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [products, setProducts] = useState<DeliveryProduct[]>([]);
  const [wayBillDate, setWayBillDate] = useState<Dayjs | null>(dayjs());
  const [deliveryReferenceNumber, setDeliveryReferenceNumber] =
    useState<string>("");

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = {
        ...data,
        date: wayBillDate,
        deliveryReferenceNumber,
        customer,
        address,
        products,
      };

      const response = await axios.post(
        "http://localhost:5000/waybills",
        formData
      );

      if (response.status === 201) {
        toast.success("Way Bill Added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // reset form
  const handleCancel = useCallback(() => {
    reset();
    setDeliveryReferenceNumber("");
    setCustomer("");
    setAddress("");
    setProducts([]);
    setWayBillDate(dayjs());
  }, [reset]);

  // Fetch Deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/deliveries");
        setDeliveries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeliveries();
  }, [deliveries]);

  // set selected delivery details
  useEffect(() => {
    const delivery = deliveries.find(
      (delivery) => delivery.deliveryReferenceNumber === deliveryReferenceNumber
    );

    if (delivery) {
      setDeliveryReferenceNumber(delivery.deliveryReferenceNumber);
      setCustomer(delivery.customer);
      setAddress(delivery.address);
      setProducts(delivery.products);
    }
  }, [deliveries, deliveryReferenceNumber]);

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
            Add Way Bill
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
              <div className="flex flex-col md:flex-row w-full gap-5">
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="wayBillDate">
                    <span className="text-primaryDark font-semibold">Date</span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <DatePicker
                    defaultValue={dayjs()}
                    value={wayBillDate}
                    onChange={(newDate) => setWayBillDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    minDate={dayjs("01-01-2000")}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Delivery Reference Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <div className="w-full">
                    <Select
                      label="Delivery Reference Number"
                      id="deliveryReferenceNumber"
                      value={deliveryReferenceNumber}
                      {...register("deliveryReferenceNumber", {
                        required: "Delivery Reference Number is required",
                      })}
                      error={!!errors.deliveryReferenceNumber}
                      onChange={(event: SelectChangeEvent) =>
                        setDeliveryReferenceNumber(event.target.value)
                      }
                      sx={{ width: "100%" }}
                    >
                      {deliveries.map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.deliveryReferenceNumber}
                        >
                          {item.deliveryReferenceNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-5 flex-col md:flex-row">
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
                    value={address}
                    disabled
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="products">
                  <span className="text-primaryDark font-semibold">
                    Products
                  </span>
                </label>
                <DataTable
                  columns={columns}
                  data={products}
                  customStyles={viewTableStyles}
                  noDataComponent={
                    <div className="w-full text-center text-primaryDark font-semibold">
                      No Products To Display
                    </div>
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-4 md:w-1/2">
                <label htmlFor="amount">
                  <span className="text-primaryDark font-semibold">Amount</span>
                  <span className="text-redColor"> *</span>
                </label>
                <TextField
                  id="amount"
                  type="number"
                  label="Amount"
                  variant="outlined"
                  {...register("amount", {
                    required: "Amount is required and cannot be less than Zero",
                    valueAsNumber: true,
                    validate: (value) => value >= 0,
                  })}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              </div>
              <div className="w-full flex flex-col gap-4">
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
            className="saveBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
