import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Customer } from "@/components/Types";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import toast from "react-hot-toast";
import { addCustomer } from "@/server/actions/customers";
import useCustomerGroupOptions from "@/utils/hooks/useCustomerGroupOptions";

type FormInput = Omit<Customer, "id" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  customerGroup: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
};

type AddCustomerProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddCustomer({ open, handleClose }: AddCustomerProps) {
  // Get Customer Groups
  const { data: customerGroupOptions } = useCustomerGroupOptions();

  const { handleSubmit, reset, register, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitting } = formState;

  // Add Customer
  const onSubmit = async (data: FormInput) => {
    try {
      const response = await addCustomer(data);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Customer added successfully");
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error adding Customer:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

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
                    options={customerGroupOptions?.success || []}
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
                    required:
                      "Phone Number is Required and must be atleast 10 digits",
                    pattern: /^(\+)?(\()?(\d ?){6,14}\d(\))?$/,
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
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
                  </FormLabel>
                  <TextField
                    id="city"
                    type="text"
                    label="City"
                    {...register("city")}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-5">
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
