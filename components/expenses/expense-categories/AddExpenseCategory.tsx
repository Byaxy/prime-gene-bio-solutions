import React, { ReactNode, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ExpenseCategory } from "@/components/Types";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ExpenseCategory, "id" | "isActive" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  description: "",
  createdAt: new Date(),
};
type AddExpenseCategoryProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddExpenseCategory({
  open,
  handleClose,
}: AddExpenseCategoryProps): ReactNode {
  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const onSubmit = async (data: FormInput) => {
    try {
      // Handle form data with corresponding API call
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Expense Category
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
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <label htmlFor="code">
                <span className="text-primaryDark font-semibold">Code</span>
              </label>
              <TextField
                id="code"
                type="text"
                label="Code"
                {...register("code")}
              />
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
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
