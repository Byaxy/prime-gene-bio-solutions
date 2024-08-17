import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { ProductCategory } from "@/components/Types";
import toast from "react-hot-toast";
import { deleteCategory } from "@/server/actions/categories";

type DeleteCategoryProps = {
  open: boolean;
  handleClose: () => void;
  category: ProductCategory;
};

const DeleteCategory = ({
  open,
  handleClose,
  category,
}: DeleteCategoryProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete Category from the database
  const handleDeleteCategory = async () => {
    setDeleting(true);
    try {
      const response = await deleteCategory(category.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Category deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Category:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Category"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <span className="text-2xl text-primaryDark font-bold">
            Delete Category
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{category?.name}</span>
          </span>
          <br />
          <br />
          <span className="text-redColor">
            <span className="font-semibold">NOTE: </span>This action cannot be
            reversed
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClose}
            size="large"
            className="saveBtn"
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              handleDeleteCategory();
              handleClose();
            }}
            className="cancelBtn"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCategory;
