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
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { ProductCategory } from "@prisma/client";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ProductCategory, "id" | "isActive" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  description: "",
  parentCategoryId: "",
};

type AddCategoryProps = {
  open: boolean;
  handleClose: () => void;
};

const options = [
  {
    label: "Category Option 1",
    value: "1",
  },

  {
    label: "Category Option 2",
    value: "2",
  },
];
export default function AddCategory({
  open,
  handleClose,
}: AddCategoryProps): ReactNode {
  const { handleSubmit, reset, control } = useForm<FormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormInput) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Category
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
          <label htmlFor="name">
            <span className="text-primaryDark font-semibold">
              Category Name
            </span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="name"
            control={control}
            label="Category Name"
          />
          <label htmlFor="code">
            <span className="text-primaryDark font-semibold">
              Category Code
            </span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="code"
            control={control}
            label="Category Code"
          />
          <label htmlFor="description">
            <span className="text-primaryDark font-semibold">
              Category Description
            </span>
          </label>
          <FormInputText
            name="description"
            control={control}
            label="Category Description"
          />
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="parentCategoryId">
              <span className="text-primaryDark font-semibold">
                Parent Category
              </span>
            </label>
            <FormInputDropdown
              name="parentCategoryId"
              control={control}
              label="Parent Category"
              options={options}
            />
          </div>
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
