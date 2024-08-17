import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import type { CustomerGroup } from "@/components/Types";
import toast from "react-hot-toast";
import { editCustomerGroup } from "@/server/actions/customerGroups";

type FormInput = Omit<CustomerGroup, "id" | "createdAt">;

type EditCustomerGroupProps = {
  open: boolean;
  handleClose: () => void;
  group: CustomerGroup;
};

const EditCustomerGroup = ({
  open,
  handleClose,
  group,
}: EditCustomerGroupProps) => {
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: {
      name: group.name,
      percentage: group.percentage,
      updatedAt: new Date(),
    },
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  // Edit Customer Group
  const onSubmit = async (data: FormInput) => {
    try {
      const response = await editCustomerGroup(data, group.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Customer Group updated successfully");
        // Clear form values
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating Customer Group:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Customer Group
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
            <div className="flex flex-col gap-2 w-full">
              <FormLabel htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <TextField
                id="name"
                type="text"
                variant="outlined"
                defaultValue={group.name}
                {...register("name", { required: "Name is Required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <FormLabel htmlFor="percentage">
                <span className="text-primaryDark font-semibold">
                  Discount Percentage
                </span>
              </FormLabel>
              <TextField
                id="percentage"
                type="number"
                label="Percentage"
                variant="outlined"
                inputProps={{ min: 0 }}
                defaultValue={group.percentage}
                {...register("percentage", { valueAsNumber: true })}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            onClick={() => reset()}
            className="cancelBtn"
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            className="saveBtn"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCustomerGroup;
