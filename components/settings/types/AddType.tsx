import React, { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/form-components/FormInputText";
import CancelIcon from "@mui/icons-material/Cancel";
import { ProductType } from "@prisma/client";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ProductType, "id" | "isActive" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  description: "",
};
type AddTypeProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddType({
  open,
  handleClose,
}: AddTypeProps): ReactNode {
  const { handleSubmit, reset, control } = useForm<FormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormInput) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  
    const response = await fetch("/api/product-type/add", options);

    const result = await response.json();
    reset();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">Add Type</span>
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
          <label htmlFor="name">
            <span className="text-primaryDark font-semibold">Type Name</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText name="name" control={control} label="Type Name" />
          <label htmlFor="description">
            <span className="text-primaryDark font-semibold">
              Type Description
            </span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="description"
            control={control}
            label="Type Description"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => reset()}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
