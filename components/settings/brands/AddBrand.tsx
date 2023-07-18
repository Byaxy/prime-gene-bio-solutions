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
import FormImageUpload from "@/components/form-components/FormImageUpload";
import { ProductBrand } from "@prisma/client";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ProductBrand, "id" | "isActive" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  image: "",
};

type AddBrandProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddBrand({
  open,
  handleClose,
}: AddBrandProps): ReactNode {
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
  
    const response = await fetch("/api/product-brand/add", options)

    const result = await response.json()
    reset();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">Add Brand</span>
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
            <span className="text-primaryDark font-semibold">Brand Name</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="name"
            control={control}
            label="Brand Name"
          />
          <label htmlFor="code">
            <span className="text-primaryDark font-semibold">Brand Code</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="code"
            control={control}
            label="Brand Code"
          />
          <label htmlFor="brandImage">
            <span className="text-primaryDark font-semibold">Brand Image</span>
          </label>
          <FormImageUpload
            name="brandImage"
            control={control}
            label="Brand Image"
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
