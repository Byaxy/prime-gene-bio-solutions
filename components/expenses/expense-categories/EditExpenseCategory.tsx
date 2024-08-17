import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ExpenseCategory } from "@/components/Types";
import toast from "react-hot-toast";
import { editExpenseCategory } from "@/server/actions/expenseCategories";

type FormInput = Omit<ExpenseCategory, "id" | "createdAt">;

type EditExpenseCategoryProps = {
  open: boolean;
  handleClose: () => void;
  expenseCategory: ExpenseCategory;
};

const EditExpenseCategory = ({
  open,
  handleClose,
  expenseCategory,
}: EditExpenseCategoryProps) => {
  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: {
      name: expenseCategory.name,
      code: expenseCategory.code,
      description: expenseCategory.description,
      updatedAt: new Date(),
    },
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FormInput) => {
    try {
      const response = await editExpenseCategory(data, expenseCategory.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Expense Category updated successfully");
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating Expense Category:", error);
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
            Edit Expense Category
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
            <div className="flex flex-col gap-2 mb-8 w-full">
              <FormLabel htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <TextField
                id="name"
                type="text"
                defaultValue={expenseCategory.name}
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <FormLabel htmlFor="code">
                <span className="text-primaryDark font-semibold">Code</span>
              </FormLabel>
              <TextField
                id="code"
                type="text"
                defaultValue={expenseCategory.code}
                {...register("code")}
              />
              <FormLabel htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
              </FormLabel>
              <TextField
                id="description"
                multiline
                rows={4}
                defaultValue={expenseCategory.description}
                {...register("description")}
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
                onClick={handleSubmit(onSubmit)}
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

export default EditExpenseCategory;
