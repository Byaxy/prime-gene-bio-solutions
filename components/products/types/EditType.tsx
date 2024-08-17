import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ProductType } from "@/components/Types";
import toast from "react-hot-toast";
import { editType } from "@/server/actions/types";

type FormInput = Omit<ProductType, "id" | "createdAt">;

type EditTypeProps = {
  open: boolean;
  handleClose: () => void;
  type: ProductType;
};

const EditType = ({ open, handleClose, type }: EditTypeProps) => {
  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: {
      name: type.name,
      description: type.description,
      updatedAt: new Date(),
    },
  });
  const { errors, isSubmitting } = formState;

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const response = await editType(data, type.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Type updated successfully");
        // Clear form values
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating Type:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">Edit Type</span>
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
                defaultValue={type.name}
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <FormLabel htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <TextField
                id="description"
                label="Description"
                defaultValue={type.description}
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
            onClick={handleSubmit(onSubmit)}
            size="large"
            className="saveBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditType;
