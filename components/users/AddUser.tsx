import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { User, Gender, UserRole } from "@/components/Types";
import Image from "next/image";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import appwriteService from "@/appwrite/appwriteConfig";
import { clear } from "console";

type FormInput = Omit<User, "id" | "role" | "phone">;

const defaultValues: FormInput = {
  name: "",
  email: "",
  password: "",
};

type AddUserProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddUser({ open, handleClose }: AddUserProps) {
  const { handleSubmit, reset, control, register, formState } = useForm<User>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [userImage, setUserImage] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.MALE);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value as Gender);
  };

  const onSubmit = async (data: User) => {
    try {
      const userAccount = await appwriteService.createUserAccount(data);
      if (userAccount) {
        toast.success("User Account Added successfully");
        return userAccount;
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setUserImage(null);
      setGender(Gender.MALE);
    }
  }, [isSubmitSuccessful, reset]);
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
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (reset(), setUserImage(null))}
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
