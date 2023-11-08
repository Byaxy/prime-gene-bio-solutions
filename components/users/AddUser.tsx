import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { User, Gender, UserRole } from "@/components/Types";
import Image from "next/image";
import axios from "axios";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { FormInputRadio } from "@/components/form-components/FormInputRadio";

type FormInput = Omit<User, "id" | "updatedAt" | "isActive">;

const defaultValues: FormInput = {
  createdAt: new Date(),
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: "",
  role: UserRole.USER,
  phone: "",
  gender: Gender.MALE,
};

type AddUserProps = {
  open: boolean;
  handleClose: () => void;
};

const userOptions = [
  {
    label: "User",
    value: "User",
  },
  {
    label: "Admin",
    value: "Admin",
  },
];

export default function AddUser({ open, handleClose }: AddUserProps) {
  const { handleSubmit, reset, control, register, formState, watch } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    console.log({ ...data, image: imageUrl });
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
          <span className="text-2xl text-primaryDark font-bold">Add User</span>
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
            <div className="flex flex-col gap-4 w-full">
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">
                  Profile Image
                </span>
              </label>
              <div className="flex flex-row gap-4 items-center">
                <div className="flex items-center justify-center rounded-full overflow-hidden">
                  <Image
                    src={previewImage === null ? "/user.png" : previewImage}
                    alt="User"
                    width={150}
                    height={150}
                  />
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
              <label htmlFor="firstName">
                <span className="text-primaryDark font-semibold">
                  First Name
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="firstName"
                type="text"
                label="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <label htmlFor="lastName">
                <span className="text-primaryDark font-semibold">
                  Last Name
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="lastName"
                type="text"
                label="First Name"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />

              <label htmlFor="gender">
                <span className="text-primaryDark font-semibold">
                  Select Gender
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <FormInputRadio name="gender" control={control} label="Gender" />

              <div className="flex flex-col w-full gap-2">
                <label htmlFor="role">
                  <span className="text-primaryDark font-semibold">
                    Select Role
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                <FormInputDropdown
                  id="role"
                  name="role"
                  control={control}
                  label="Role"
                  options={userOptions}
                />
              </div>

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
                  errors.phone ? "Phone Number is must be 10 digits" : ""
                }
              />

              <label htmlFor="password">
                <span className="text-primaryDark font-semibold">Password</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="password"
                type="password"
                label="Password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character (@, $, !, %, *, ?, and &.)"
                    : ""
                }
              />
              <label htmlFor="confirmPassword">
                <span className="text-primaryDark font-semibold">
                  Confirm Password
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? "Passwords do not match" : ""
                }
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (reset(), setPreviewImage(null))}
          >
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
