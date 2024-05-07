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
import type { Customer, CustomerGroup, Option } from "@/components/Types";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import toast from "react-hot-toast";
import axios from "axios";

type FormInput = Omit<Customer, "id">;

const defaultValues: FormInput = {
  customerGroup: "General",
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

type AddCustomerProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddCustomer({ open, handleClose }: AddCustomerProps) {
  const [contactPersonStatus, setContactPersonStatus] =
    useState<boolean>(false);
  const [customerStatus, setCustomerStatus] = useState<boolean>(true);
  const [customerGroupOptions, setCustomerGroupOptions] = useState<Option[]>(
    []
  );

  const { handleSubmit, reset, register, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const handleContactPersonStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactPersonStatus(event.target.value === "true");
  };

  const handleCustomerStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerStatus(event.target.value === "true");
  };

  const onSubmit = async (data: FormInput) => {
    try {
      // Handle form data with corresponding API call
      const newData = {
        ...data,
        isActive: customerStatus,
        contactPerson: {
          ...data.contactPerson,
          isActive: contactPersonStatus,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/customers",
        newData
      );

      if (response.status === 201) {
        toast.success("Customer Added successfully");
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

  useEffect(() => {
    async function fetchCustomerGroupOptions() {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/customer-groups`
        );
        const options = data.map((option: CustomerGroup) => ({
          label: option.name,
          value: option.name,
        }));

        setCustomerGroupOptions(options);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCustomerGroupOptions();
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Customer
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
          <span className="text-primaryDark font-semibold text-xl block mt-8 mb-2">
            Customer Details
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="name">
                    <span className="text-primaryDark font-semibold">Name</span>
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
                <div className="flex flex-col w-full gap-2">
                  <FormLabel htmlFor="customerGroup">
                    <span className="text-primaryDark font-semibold">
                      Customer Group
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <FormInputDropdown
                    id="customerGroup"
                    name="customerGroup"
                    control={control}
                    label="Customer Group"
                    options={customerGroupOptions}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <FormLabel htmlFor="email">
                  <span className="text-primaryDark font-semibold">Email</span>
                </FormLabel>
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  {...register("email")}
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
                  label="xxx-xxx-xxxx"
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
                  htmlFor="customerStatus"
                  className="text-primaryDark font-semibold"
                >
                  Customer Status
                </FormLabel>
                <RadioGroup
                  id="customerStatus"
                  row
                  aria-labelledby="Customer status"
                  name="isActive"
                  value={customerStatus}
                  onChange={handleCustomerStatusChange}
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
                    {...register("contactPerson.email")}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <FormLabel
                  htmlFor="contact-person-status"
                  className="text-primaryDark font-semibold"
                >
                  Status
                </FormLabel>
                <RadioGroup
                  id="contact-person-status"
                  row
                  aria-labelledby="contact-person-status"
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
                  {...register("contactPerson.phone", {
                    pattern: /^(\+)?(\()?(\d ?){6,14}\d(\))?$/,
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
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
