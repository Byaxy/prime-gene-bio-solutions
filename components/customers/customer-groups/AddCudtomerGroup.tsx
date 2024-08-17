import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import type { CustomerGroup } from "@/components/Types";
import toast from "react-hot-toast";
import { addCustomerGroup } from "@/server/actions/customerGroups";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<CustomerGroup, "id" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  percentage: 0,
};

type AddCustomerGroupProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddCustomerGroup({
  open,
  handleClose,
}: AddCustomerGroupProps) {
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitting } = formState;

  // handle form submission
  const onSubmit = async (data: FormInput) => {
    try {
      const response = await addCustomerGroup(data);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Customer Group added successfully");
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error adding Customer Group:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

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
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="name">
                  <span className="text-primaryDark font-semibold">Name</span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="name"
                  type="text"
                  label="Name"
                  variant="outlined"
                  {...register("name", { required: "Name is Required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="percentage">
                  <span className="text-primaryDark font-semibold">
                    Discount Percentage
                  </span>
                </FormLabel>
                <TextField
                  id="percentage"
                  type="number"
                  label="Percentage"
                  inputProps={{ min: 0 }}
                  variant="outlined"
                  {...register("percentage", { valueAsNumber: true })}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            onClick={() => reset()}
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            className="saveBtn"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
