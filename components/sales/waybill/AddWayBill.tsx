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
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { allDeliveriesData } from "@/data/allDeliveriesData";
import type { DeliveryProduct, WayBill } from "@/components/Types";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";

// TO DO - update typee to Way Bill type
type FormInput = Omit<WayBill, "id" | "updatedAt" | "isActive">;

const defaultValues: FormInput = {
  date: new Date(),
  deliveryReferenceNumber: "",
  customer: "",
  address: "",
  products: [],
  description: "",
  amount: 0,
  createdAt: new Date(),
};

type AddWayBillProps = {
  open: boolean;
  handleClose: () => void;
};

const columns = [
  {
    name: "Lot Number",
    selector: (row: { lotNumber: string }) => row.lotNumber,
  },
  {
    name: "Product Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Qty Requested",
    selector: (row: { quantityRequested: number }) => row.quantityRequested,
  },
  {
    name: "Qty Supplied",
    selector: (row: { quantitySupplied: number }) => row.quantitySupplied,
  },
];

export default function AddWayBill({ open, handleClose }: AddWayBillProps) {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [customer, setCustomer] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [products, setProducts] = useState<DeliveryProduct[]>([]);
  const [wayBillDate, setWayBillDate] = useState<Dayjs | null>(dayjs());
  const [deliveryReferenceNumber, setDeliveryReferenceNumber] =
    useState<string>("");

  const onSubmit = async (data: FormInput) => {
    // Handle form data with corresponding API call
    const formData = {
      ...data,
      customer,
      address,
      products,
    };
    console.log(formData);
  };

  const handleCancel = useCallback(() => {
    reset();
    setDeliveryReferenceNumber("");
    setCustomer("");
    setAddress("");
    setProducts([]);
    setWayBillDate(dayjs());
  }, [reset]);

  useEffect(() => {
    const delivery = allDeliveriesData.data.find(
      (delivery) => delivery.deliveryReferenceNumber === deliveryReferenceNumber
    );

    if (delivery) {
      setDeliveryReferenceNumber(delivery.deliveryReferenceNumber);
      setCustomer(delivery.customer);
      setAddress(delivery.address);
      setProducts(delivery.products);
    }
  }, [deliveryReferenceNumber]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      handleCancel();
    }
  }, [handleCancel, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
            <p>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </p>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-2">
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
                <div className="flex flex-col flex-1 gap-2">
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
                      {allDeliveriesData.data.map((item) => (
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

              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-2">
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
                <div className="flex flex-col flex-1 gap-2">
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

              <div className="w-full flex flex-col py-5 gap-2">
                <label htmlFor="products">
                  <span className="text-primaryDark font-semibold">
                    Products
                  </span>
                </label>
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
                  required: true,
                  valueAsNumber: true,
                  validate: (value) => value >= 0,
                })}
                error={!!errors.amount}
                helperText={
                  errors.amount ? "Amount is required and cannot be Zero" : ""
                }
              />

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
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCancel}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            className="font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
