import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Customer, Option } from "@/components/Types";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import toast from "react-hot-toast";
import { DB, query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

type FormInput = Omit<Customer, "id" | "createdAt" | "updatedAt">;
type EditCustomerDetailsProps = {
  open: boolean;
  handleClose: () => void;
  customer: Customer;
};

const EditCustomer = ({
  open,
  handleClose,
  customer,
}: EditCustomerDetailsProps) => {
  const [customerGroupOptions, setCustomerGroupOptions] = useState<Option[]>(
    []
  );

  const { handleSubmit, reset, register, formState, control } =
    useForm<FormInput>({
      defaultValues: {
        name: customer.name,
        customerGroup: customer.customerGroup,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
      },
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  // Edit Customer
  const onSubmit = async (data: FormInput) => {
    try {
      await DB.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCustomersCollectionId,
        customer.id,
        data
      ).then(() => {
        toast.success("Customer Edited successfully");
      });
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

  // Fetch Customer Group Options
  useEffect(() => {
    async function fetchCustomerGroupOptions() {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCustomerGroupsCollectionId,
          query
        );
        const customersOptions = documents.map((doc: any) => ({
          label: doc.name,
          value: doc.$id,
        }));

        setCustomerGroupOptions(customersOptions);
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
                    defaultValue={customer.name}
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
                    defaultValue={customer.customerGroup}
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
                  defaultValue={customer.email}
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
                  defaultValue={customer.phone}
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
                    defaultValue={customer.address}
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
                    defaultValue={customer.city}
                    {...register("city")}
                    error={!!errors.city}
                    helperText={errors.city?.message}
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
                    defaultValue={customer.country}
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
            Reset
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
};

export default EditCustomer;
