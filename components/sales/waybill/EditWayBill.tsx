import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import type { WayBill } from "@/components/Types";
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";
import axios from "axios";
import toast from "react-hot-toast";

type FormInput = Omit<WayBill, "id" | "createdAt" | "isActive">;

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

type EditWayBillProps = {
  open: boolean;
  handleClose: () => void;
  wayBill: WayBill;
};

const EditWayBill = ({ open, handleClose, wayBill }: EditWayBillProps) => {
  const defaultValues: FormInput = {
    date: wayBill.date,
    deliveryReferenceNumber: wayBill.deliveryReferenceNumber,
    customer: wayBill.customer,
    address: wayBill.address,
    products: wayBill.products,
    description: wayBill.description,
    amount: wayBill.amount,
    updatedAt: new Date(),
  };
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [wayBillDate, setWayBillDate] = useState<Dayjs | null>(dayjs());

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = {
        ...data,
        date: wayBillDate,
      };

      const response = await axios.patch(
        `http://localhost:5000/waybills/${wayBill.id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Way Bill Edited successfully");
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
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Edit Way Bill
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
                    defaultValue={dayjs(wayBill.date)}
                    value={wayBillDate}
                    onChange={(newDate) => setWayBillDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Delivery Reference Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="deliveryReferenceNumber"
                    type="text"
                    label="Delivery Reference Number"
                    variant="outlined"
                    value={wayBill.deliveryReferenceNumber}
                    disabled
                  />
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
                    value={wayBill.customer}
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
                    value={wayBill.customer}
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
                  data={wayBill.products}
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
                  defaultValue={wayBill.amount}
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
                  defaultValue={wayBill.description}
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
            onClick={() => reset()}
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

export default EditWayBill;
