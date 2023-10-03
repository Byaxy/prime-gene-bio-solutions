"use client";

import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { Sale } from "@/components/Types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { customersData } from "@/data/customersData";

type FormInput = Omit<Sale, "updatedAt" | "isActive">;
type CustomerOptions = {
  label: string;
  value: string;
};

const options: CustomerOptions[] = customersData.data.map((customer) => ({
  label: customer.name,
  value: customer.id,
}));

const defaultValues: FormInput = {
  id: "",
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
  createdAt: new Date(),
};

export default function AddSalePage() {
  const [saleDate, setSaleDate] = useState<Dayjs | null>(dayjs());

  const router = useRouter();
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

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
      <form action="">
        <div className="flex flex-col sm:flex-row gap-5 w-full">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="expenseDate">
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
            <label htmlFor="price">
              <span className="text-primaryDark font-semibold text-xl">
                Invoice Number
              </span>
              <span className="text-redColor"> *</span>
            </label>
            <TextField
              id="price"
              type="number"
              label="Product Price"
              variant="outlined"
              {...register("invoiceNumber", {
                required: "Invoice Number is required",
              })}
              error={!!errors.invoiceNumber}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="category">
              <span className="text-primaryDark font-semibold">Customer</span>
            </label>
            <FormInputDropdown
              name="category"
              control={control}
              label="Select Customer"
              options={options}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
