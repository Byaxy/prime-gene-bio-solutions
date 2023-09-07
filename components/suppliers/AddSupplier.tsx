import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Supplier } from "@/components/Types";

type FormInput = Omit<Supplier, "id" | "updatedAt" | "isActive">;

const defaultValues: FormInput = {
  company: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  createdAt: new Date(),
};

type AddSupplierProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddSupplier({ open, handleClose }: AddSupplierProps) {
  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const onSubmit = async (data: FormInput) => {
    try {
      // Handle form data with corresponding API call
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Supplier
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
              <label htmlFor="company">
                <span className="text-primaryDark font-semibold">
                  Company Name
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="company"
                label="Company"
                {...register("company", {
                  required: "Company is required",
                })}
                error={!!errors.company}
                helperText={errors.company?.message}
              />
              <label htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="name"
                type="text"
                label="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <label htmlFor="email">
                <span className="text-primaryDark font-semibold">Email</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="email"
                type="text"
                label="Email"
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <label htmlFor="phone">
                <span className="text-primaryDark font-semibold">
                  Phone Number
                </span>
              </label>
              <TextField
                id="phone"
                type="tel"
                label="xxx-xxx-xxxx"
                {...register("phone", {
                  required: true,
                  pattern: /^\d{10}$/,
                })}
                error={!!errors.phone}
                helperText={
                  errors.phone
                    ? "Phone Number is Required and must be 10 digits"
                    : ""
                }
              />
              <label htmlFor="postalCode">
                <span className="text-primaryDark font-semibold">
                  Postal Code
                </span>
              </label>
              <TextField
                id="postalCode"
                type="text"
                label="Postal Code"
                {...register("postalCode")}
              />
              <label htmlFor="address">
                <span className="text-primaryDark font-semibold">Address</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="address"
                type="text"
                label="Address"
                {...register("address", {
                  required: "Address is required",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <label htmlFor="city">
                <span className="text-primaryDark font-semibold">City</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="city"
                type="text"
                label="City"
                {...register("city", {
                  required: "City is required",
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />

              <label htmlFor="state">
                <span className="text-primaryDark font-semibold">State</span>
              </label>
              <TextField
                id="state"
                type="text"
                label="State"
                {...register("state")}
              />
              <label htmlFor="country">
                <span className="text-primaryDark font-semibold">Country</span>
              </label>
              <TextField
                id="country"
                type="text"
                label="Country"
                {...register("country")}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="large" onClick={() => reset()}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
