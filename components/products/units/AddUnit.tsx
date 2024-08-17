import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import { addUnit } from "@/server/actions/units";
import { Unit } from "@/components/Types";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<Unit, "id" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
};

type AddUnitProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddUnit({ open, handleClose }: AddUnitProps) {
  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitting } = formState;

  // submit form data
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addUnit(data);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Unit added successfully");
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error adding Unit:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  });

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
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
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
}
