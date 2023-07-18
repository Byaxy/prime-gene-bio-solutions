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

interface IFormInput {
  unitName: string;
  unitCode: string;
}

const defaultValues = {
  unitName: "",
  unitCode: "",
};
type AddUnitProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddUnit({
  open,
  handleClose,
}: AddUnitProps): ReactNode {
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
          <span className="text-2xl text-primaryDark font-bold">Add Unit</span>
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
          <label htmlFor="unitName">
            <span className="text-primaryDark font-semibold">Unit Name</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText name="unitName" control={control} label="Unit Name" />
          <label htmlFor="unitCode">
            <span className="text-primaryDark font-semibold">Unit Code</span>
            <span className="text-redColor"> *</span>
          </label>
          <FormInputText name="unitCode" control={control} label="Unit Code" />
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