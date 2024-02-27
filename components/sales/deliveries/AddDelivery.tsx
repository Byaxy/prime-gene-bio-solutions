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
import type { Delivery } from "@/components/Types";
import { allSalesData } from "@/data/allSalesData";
import DataTable from "react-data-table-component";
import type { DeliveryProduct } from "@/components/Types";
import { customTableStyles } from "@/styles/TableStyles";

// TO DO - update typee to Delivery type
type FormInput = Omit<Delivery, "id" | "updatedAt" | "isActive">;

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
};

type AddDeliveryProps = {
  open: boolean;
  handleClose: () => void;
};

const options = [
  {
    label: "Parking",
    value: "Parking",
  },
  {
    label: "Delivering",
    value: "Delivering",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
];

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
    cell: (row: { quantityRequested: number }) => (
      // register the quantitySupplied for each product.
      <TextField
        variant="outlined"
        size="small"
        type="number"
        className="w-[80px]"
        defaultValue={row.quantityRequested}
        inputProps={{ max: row.quantityRequested, min: 0 }}
      />
    ),
  },
];

export default function AddDelivery({ open, handleClose }: AddDeliveryProps) {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [deliveryDate, setDeliveryDate] = useState<Dayjs | null>(dayjs());
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [products, setProducts] = useState<DeliveryProduct[]>([]);

  const onSubmit = async (data: FormInput) => {
    // Handle form data with corresponding API call
    const formData = {
      ...data,
      date: deliveryDate,
      saleInvoiceNumber: invoiceNumber,
      customer,
      products,
    };
    console.log(formData);
  };

  const handleCancel = useCallback(() => {
    reset();
    setInvoiceNumber("");
    setCustomer("");
    setProducts([]);
    setDeliveryDate(dayjs());
  }, [reset]);

  useEffect(() => {
    const sale = allSalesData.data.find(
      (sale) => sale.invoiceNumber === invoiceNumber
    );
    if (sale) {
      setCustomer(sale.customer);

      let products: DeliveryProduct[] = [];
      sale.products.forEach(
        (product: { id: any; lotNumber: any; name: any; quantity: any }) => {
          products.push({
            id: product.id,
            lotNumber: product.lotNumber,
            name: product.name,
            quantityRequested: product.quantity,
            quantitySupplied: 0,
          });
        }
      );
      setProducts(products);
    }
  }, [invoiceNumber]);
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
                  <label htmlFor="deliveryDate">
                    <span className="text-primaryDark font-semibold">Date</span>
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
                <div className="flex flex-col flex-1 gap-2">
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
                    options={options}
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
                      {allSalesData.data.map((item) => (
                        <MenuItem key={item.id} value={item.invoiceNumber}>
                          {item.invoiceNumber}
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
                  <label htmlFor="amount">
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
              <div className="flex flex-col gap-2 w-full">
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
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            disabled={isSubmitting}
            className="font-bold"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
