import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Expense } from "../Types";
import axios from "axios";
import Image from "next/image";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type FormInput = Omit<Expense, "id" | "updatedAt" | "isActive">;

const defaultValues: FormInput = {
  date: new Date(),
  title: "",
  reference: "",
  category: "",
  description: "",
  amount: 0,
  image: "",
  createdAt: new Date(),
};

type AddExpenseProps = {
  open: boolean;
  handleClose: () => void;
};

const options = [
  {
    label: "Purchase",
    value: "Purchase",
  },
  {
    label: "Office Maintenance",
    value: "Office Maintenance",
  },
  {
    label: "Transportation",
    value: "Transportation",
  },
  {
    label: "Salary",
    value: "Salary",
  },
];

export default function AddExpense({ open, handleClose }: AddExpenseProps) {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [expenseDate, setExpenseDate] = useState<Dayjs | null>(dayjs());

  const onSubmit = async (data: FormInput) => {
    if (data.image.length > 0) {
      const imageFile = data.image[0];

      const formData = new FormData();
      formData.append("file", imageFile);

      formData.append("upload_preset", "prime-gene-bio-solutions");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dykyxconb/image/upload",
          formData
        );
        setImageUrl(response.data.secure_url);
        console.log(imageUrl);
      } catch (error) {
        console.error(error);
      }
    } else {
      setImageUrl(null);
      console.log(imageUrl);
    }

    // Handle form data and cloudinary image url with corresponding API call
    console.log({ ...data, image: imageUrl, date: expenseDate });
  };

  // Set selected Image for preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setPreviewImage(null);
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Expense
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
              <label htmlFor="expenseDate">
                <span className="text-primaryDark font-semibold">Date</span>
                <span className="text-redColor"> *</span>
              </label>
              <DatePicker
                defaultValue={dayjs()}
                value={expenseDate}
                onChange={(newDate) => setExpenseDate(newDate)}
                format="LL"
                label="MM-DD-YYYY"
                disableFuture={true}
                minDate={dayjs("01-01-2000")}
              />

              <label htmlFor="title">
                <span className="text-primaryDark font-semibold">
                  Expense Title
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="title"
                type="text"
                label="Expense Title"
                {...register("title", {
                  required: "Name is required",
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <label htmlFor="reference">
                <span className="text-primaryDark font-semibold">
                  Reference Number
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="reference"
                type="text"
                label="Reference Number"
                {...register("reference", {
                  required: "Reference Number is required",
                })}
                error={!!errors.reference}
                helperText={errors.reference?.message}
              />
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
                  validate: (value) => value > 0,
                })}
                error={!!errors.amount}
                helperText={
                  errors.amount ? "Amount is required and cannot be Zero" : ""
                }
              />
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="category">
                  <span className="text-primaryDark font-semibold">
                    Category
                  </span>
                </label>
                <FormInputDropdown
                  id="category"
                  name="category"
                  control={control}
                  label="Expense Category"
                  options={options}
                />
              </div>
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">
                  Attachment
                </span>
              </label>
              <div className="flex flex-row gap-2 items-center">
                <div>
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <TextField
                  id="image"
                  type="file"
                  variant="outlined"
                  {...register("image")}
                  onChange={handleImageChange}
                  inputProps={{ accept: "image/*", multiple: false }}
                />
              </div>
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
              </label>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                {...register("description")}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => reset()}
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
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
