import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { User, UserRole } from "@/components/Types";
import toast from "react-hot-toast";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { signup } from "@/server/actions/signup";

type FormInput = Omit<User, "id" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: UserRole.USER,
  confirmPassword: "",
};

type AddUserProps = {
  open: boolean;
  handleClose: () => void;
};

const roleOptions = [
  {
    label: "User",
    value: UserRole.USER,
  },
  {
    label: "Admin",
    value: UserRole.ADMIN,
  },
];

export default function AddUser({ open, handleClose }: AddUserProps) {
  const { handleSubmit, reset, register, formState, watch, control } =
    useForm<User>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  // submit form data
  const onSubmit = async (data: User) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("role", data.role);

      // Send form data to server
      const response = await signup(formData);

      const { error } = JSON.parse(response);

      if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.success("User Created Successfully");
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error creating User:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">Add User</span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="name">
                  <span className="text-primaryDark font-semibold">Name</span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="name"
                  type="text"
                  label="Name"
                  {...register("name", {
                    required: "First Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="email">
                  <span className="text-primaryDark font-semibold">Email</span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  {...register("email", {
                    required: "Email is required and must be valid",
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="password">
                  <span className="text-primaryDark font-semibold">
                    Password
                  </span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  {...register("password", {
                    required: "Password must contain at least 8 characters",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="confirmPassword">
                  <span className="text-primaryDark font-semibold">
                    Confirm Password
                  </span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-5 md:gap-4 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="phoneMumber">
                    <span className="text-primaryDark font-semibold">
                      Phone Number
                    </span>
                  </FormLabel>
                  <TextField
                    id="phoneMumber"
                    type="text"
                    label="Phone Number"
                    {...register("phone", {
                      pattern: {
                        value:
                          /^(\+\d{1,2}\s?)?1?\-?\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="role">
                    <span className="text-primaryDark font-semibold">Role</span>
                  </FormLabel>
                  <FormInputDropdown
                    id="role"
                    control={control}
                    label="Select Role"
                    options={roleOptions}
                    {...register("role")}
                  />
                  {errors.role && (
                    <span className="text-redColor text-sm">
                      {errors.role?.message}
                    </span>
                  )}
                </div>
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
}
