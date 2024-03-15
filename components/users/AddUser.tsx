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
import axios from "axios";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { FormInputRadio } from "@/components/form-components/FormInputRadio";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

type FormInput = Omit<User, "id" | "updatedAt" | "isActive">;

const userOptions = [
  {
    label: "User",
    value: "USER",
  },
  {
    label: "Admin",
    value: "ADMIN",
  },
];

const genderOptions = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const defaultValues: FormInput = {
  createdAt: new Date(),
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  image: "",
  role: UserRole.USER,
  phone: "",
  gender: Gender.MALE,
};

type AddUserProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddUser({ open, handleClose }: AddUserProps) {
  const { handleSubmit, reset, control, register, formState } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [userImage, setUserImage] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.MALE);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value as Gender);
  };

  const onSubmit = async (data: FormInput) => {
    try {
      // Handle form data with corresponding API call
      const formData = new FormData();
      const newData = { ...data, image: userImage, gender };
      formData.append("json", JSON.stringify(newData));

      console.log(JSON.stringify(newData));
      toast.success("User added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong try again later");
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
          <DialogContentText className="mb-5">
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <FormLabel htmlFor="image">
                <span className="text-primaryDark font-semibold">
                  Profile Image
                </span>
              </FormLabel>
              <div className="flex flex-row gap-4 items-center">
                <div className="flex items-center justify-center rounded-full overflow-hidden">
                  <Image
                    src={userImage === null ? "/user.png" : userImage}
                    alt="User"
                    width={200}
                    height={200}
                  />
                </div>
                <CldUploadWidget
                  uploadPreset="prime-gene-biomedical-solutions"
                  options={{
                    multiple: false,
                    clientAllowedFormats: ["jpg", "png", "webp", "svg"],
                    sources: ["local", "url", "dropbox", "google_drive"],
                  }}
                  onSuccess={(result) => {
                    if (result.info && typeof result.info !== "string") {
                      const url: string = result.info.secure_url;
                      setUserImage(url);
                    }
                  }}
                >
                  {({ open }) => {
                    return (
                      <Button
                        variant="contained"
                        size="large"
                        className="capitalize"
                        onClick={() => open()}
                      >
                        Upload an Image
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="firstName">
                    <span className="text-primaryDark font-semibold">
                      First Name
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
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
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="lastName">
                    <span className="text-primaryDark font-semibold">
                      Last Name
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
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
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="email">
                  <span className="text-primaryDark font-semibold">Email</span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
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
              </div>
              <div className="flex flex-col gap-2 w-full">
                <FormLabel htmlFor="gender">
                  <span className="text-primaryDark font-semibold">
                    Select Gender
                  </span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <RadioGroup
                  id="gender"
                  row
                  aria-labelledby="Gender"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={Gender.MALE}
                    control={<Radio className="text-primaryDark" />}
                    label="Male"
                    className="text-primaryDark"
                  />
                  <FormControlLabel
                    value={Gender.FEMALE}
                    control={<Radio className="text-primaryDark" />}
                    label="Female"
                    className="text-primaryDark"
                  />
                  <FormControlLabel
                    value={Gender.OTHER}
                    control={<Radio className="text-primaryDark" />}
                    label="Other"
                    className="text-primaryDark"
                  />
                </RadioGroup>
                {errors.gender && (
                  <span className="text-redColor text-sm">
                    {errors?.gender.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="phone">
                    <span className="text-primaryDark font-semibold">
                      Phone Number
                    </span>
                  </FormLabel>
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
                </div>
                <div className="flex flex-col w-full gap-4">
                  <FormLabel htmlFor="role">
                    <span className="text-primaryDark font-semibold">
                      Select Role
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <FormInputDropdown
                    id="role"
                    control={control}
                    label="Role"
                    {...register("role", {
                      required: "Role is required",
                    })}
                    options={userOptions}
                  />
                  {errors.role && (
                    <span className="text-redColor text-sm">
                      {errors?.role.message}
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
            onClick={() => (reset(), setUserImage(null))}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white border-0 hover:border-0"
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
