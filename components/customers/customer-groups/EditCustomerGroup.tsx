import React, { ReactNode, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import type { CustomerGroup } from "@/components/Types";
import axios from "axios";
import toast from "react-hot-toast";

type FormInput = Omit<CustomerGroup, "id" | "createdAt" | "isActive">;

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

  const onSubmit = async (data: FormInput) => {
    try {
      // Handle form data with corresponding API call
      const response = await axios.patch(
        `http://localhost:5000/customer-groups/${group.id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Customer Group Edited Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
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
                label="Name"
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
            Cancel
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
