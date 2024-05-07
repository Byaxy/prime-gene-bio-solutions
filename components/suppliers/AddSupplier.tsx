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
import type { Supplier } from "@/components/Types";
import toast from "react-hot-toast";
import axios from "axios";

type FormInput = Omit<Supplier, "id">;

const defaultValues: FormInput = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  contactPerson: { name: "", email: "", phone: "", isActive: false },
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
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
  const [contactPersonStatus, setContactPersonStatus] =
    useState<boolean>(false);
  const [supplierStatus, setSupplierStatus] = useState<boolean>(true);

  const handleContactPersonStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactPersonStatus(event.target.value === "true");
  };

  const handleSupplierStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSupplierStatus(event.target.value === "true");
  };

  const onSubmit = async (data: FormInput) => {
    try {
      // Handle form data with corresponding API call
      const newData = {
        ...data,
        isActive: supplierStatus,
        contactPerson: { ...data.contactPerson, isActive: contactPersonStatus },
      };
      const response = await axios.post(
        "http://localhost:5000/suppliers",
        newData
      );
      if (response.status === 201) {
        toast.success("Supplier Added Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      setSupplierStatus(true);
      setContactPersonStatus(false);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col w-full gap-2">
                <FormLabel htmlFor="name">
                  <span className="text-primaryDark font-semibold">
                    Company Name
                  </span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
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
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="email">
                    <span className="text-primaryDark font-semibold">
                      Email
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="email"
                    type="email"
                    label="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="phone">
                    <span className="text-primaryDark font-semibold">
                      Phone Number
                    </span>
                  </FormLabel>
                  <TextField
                    id="phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="(123)4567890"
                    {...register("phone", {
                      required: true,
                      pattern: /^(\+)?(\()?(\d ?){6,14}\d(\))?$/,
                    })}
                    error={!!errors.phone}
                    helperText={
                      errors.phone
                        ? "Phone Number is Required and must be 10 digits"
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="address">
                    <span className="text-primaryDark font-semibold">
                      Address
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
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
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="city">
                    <span className="text-primaryDark font-semibold">City</span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
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
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="state">
                    <span className="text-primaryDark font-semibold">
                      State
                    </span>
                  </FormLabel>
                  <TextField
                    id="state"
                    type="text"
                    label="State"
                    {...register("state")}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="country">
                    <span className="text-primaryDark font-semibold">
                      Country
                    </span>
                  </FormLabel>
                  <TextField
                    id="country"
                    type="text"
                    label="Country"
                    {...register("country")}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <FormLabel
                  htmlFor="supplierStatus"
                  className="text-primaryDark font-semibold"
                >
                  Supplier Status
                </FormLabel>
                <RadioGroup
                  id="supplierStatus"
                  row
                  aria-labelledby="Supplier status"
                  name="isActive"
                  value={supplierStatus}
                  onChange={handleSupplierStatusChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio className="text-primaryDark" />}
                    label="Active"
                    className="text-primaryDark"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio className="text-primaryDark" />}
                    label="Not Active"
                    className="text-primaryDark"
                  />
                </RadioGroup>
              </div>
            </div>
            <span className="text-primaryDark font-semibold text-xl block mt-16 mb-2">
              Contact Person Details
            </span>
            <div className="flex flex-col gap-5 w-full">
              <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="name">
                    <span className="text-primaryDark font-semibold">Name</span>
                  </FormLabel>
                  <TextField
                    id="contactPersonName"
                    type="text"
                    label="Name"
                    aria-label="Contact Person Name"
                    {...register("contactPerson.name")}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="email">
                    <span className="text-primaryDark font-semibold">
                      Email
                    </span>
                  </FormLabel>
                  <TextField
                    id="contactPersonEmail"
                    type="email"
                    label="Email"
                    aria-label="Email"
                    {...register("contactPerson.email")}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <FormLabel
                  htmlFor="contactPersonStatus"
                  className="text-primaryDark font-semibold"
                >
                  Status
                </FormLabel>
                <RadioGroup
                  id="contactPersonStatus"
                  row
                  aria-labelledby="Contact person status"
                  name="contactPerson.isActive"
                  value={contactPersonStatus}
                  onChange={handleContactPersonStatusChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio className="text-primaryDark" />}
                    label="Active"
                    className="text-primaryDark"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio className="text-primaryDark" />}
                    label="Not Active"
                    className="text-primaryDark"
                  />
                </RadioGroup>
              </div>
              <div className="flex flex-col w-full gap-2 max-w-[400px]">
                <FormLabel htmlFor="phone">
                  <span className="text-primaryDark font-semibold">
                    Phone Number
                  </span>
                </FormLabel>
                <TextField
                  id="phone"
                  type="tel"
                  label="xxx-xxx-xxxx"
                  aria-labelledby="Phone Number"
                  {...register("contactPerson.phone", {
                    pattern: /^\d{10}$/,
                  })}
                  error={!!errors.contactPerson?.phone}
                  helperText={
                    errors.contactPerson?.phone?.message
                      ? "Phone Number must be 10 digits"
                      : ""
                  }
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
}
