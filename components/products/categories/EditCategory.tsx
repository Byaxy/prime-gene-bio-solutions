import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import type { ProductCategory } from "@/components/Types";
import { editCategory } from "@/server/actions/categories";

type FormInput = Omit<ProductCategory, "id" | "createdAt">;
type EditCategoryProps = {
  open: boolean;
  handleClose: () => void;
  category: ProductCategory;
};
const EditCategory = ({ open, handleClose, category }: EditCategoryProps) => {
  const { handleSubmit, reset, control, register, formState } =
    useForm<FormInput>({
      defaultValues: {
        name: category.name,
        code: category.code,
        description: category.description,
        updatedAt: new Date(),
      },
    });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const response = await editCategory(data, category.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Category updated successfully");
        // Clear form values
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating Category:", error);
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
            Edit Category
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
                defaultValue={category.name}
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
                label="Code"
                defaultValue={category.code}
                {...register("code")}
                error={!!errors.code}
                helperText={errors.code?.message}
              />

              <FormLabel htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
              </FormLabel>
              <TextField
                id="description"
                label="Description"
                defaultValue={category.description}
                multiline
                rows={3}
                {...register("description")}
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

export default EditCategory;
