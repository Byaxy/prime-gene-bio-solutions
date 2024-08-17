import React, { Dispatch, SetStateAction, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Unit } from "@/components/Types";
import toast from "react-hot-toast";
import { editUnit } from "@/server/actions/units";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<Unit, "id" | "createdAt">;

type EditUnitProps = {
  open: boolean;
  handleClose: () => void;
  unit: Unit;
};

const EditUnit = ({ open, handleClose, unit }: EditUnitProps) => {
  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: {
      name: unit.name,
      code: unit.code,
      updatedAt: new Date(),
    },
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // submit form data
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await editUnit(data, unit.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Unit updated successfully");
        // Clear form values
        reset({}, { keepDefaultValues: true });

        handleClose();
      }
    } catch (error) {
      console.error("Error updating Unit:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  });

  // Reset form to defaults on Successfull submission of data
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
          <span className="text-2xl text-primaryDark font-bold">Edit Unit</span>
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
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 mb-8 w-full">
              <FormLabel htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <TextField
                id="name"
                type="text"
                label="Name"
                defaultValue={unit.name}
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <FormLabel htmlFor="code">
                <span className="text-primaryDark font-semibold">Code</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <TextField
                id="code"
                type="text"
                label="Code"
                defaultValue={unit.code}
                {...register("code", {
                  required: "Code is required",
                })}
                error={!!errors.code}
                helperText={errors.code?.message}
              />
            </div>
            <DialogActions>
              <Button
                variant="contained"
                size="large"
                onClick={() => reset()}
                className="cancelBtn"
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={onSubmit}
                size="large"
                className="saveBtn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUnit;
