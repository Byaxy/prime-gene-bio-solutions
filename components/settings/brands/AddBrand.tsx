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

interface IFormInput {
  brandName: string;
  brandCode: string;
  brandImage: string;
}

const defaultValues = {
  brandName: "",
  brandCode: "",
  brandImage: "",
};

type AddBrandProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddBrand({
  open,
  handleClose,
}: AddBrandProps): ReactNode {
  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
          <label htmlFor="brandName">
            <span className="text-primaryDark font-semibold">Brand Name</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="brandName"
            control={control}
            label="Brand Name"
          />
          <label htmlFor="brandCode">
            <span className="text-primaryDark font-semibold">Brand Code</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText
            name="brandCode"
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
