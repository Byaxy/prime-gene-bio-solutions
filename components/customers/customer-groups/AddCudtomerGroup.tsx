import React, { ReactNode, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { CustomerGroups } from "@/components/Types";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<CustomerGroups, "id" | "isActive" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  createdAt: new Date(),
  percentage: 0,
};

type AddCustomerGroupProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddCustomerGroup({
  open,
  handleClose,
}: AddCustomerGroupProps): ReactNode {
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const onSubmit = async (data: FormInput) => {
    console.log(data);
    console.log(isSubmitSuccessful);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
            <p>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </p>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="name"
                type="text"
                label="Name"
                variant="outlined"
                {...register("name", { required: "Name is Required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <label htmlFor="percentage">
                <span className="text-primaryDark font-semibold">
                  Peercentage
                </span>
              </label>
              <TextField
                id="percentage"
                type="number"
                label="Percentage"
                variant="outlined"
                {...register("percentage", { valueAsNumber: true })}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button size="large" variant="outlined" onClick={() => reset()}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
