import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { ExpenseCategory } from "@/components/Types";
import toast from "react-hot-toast";
import { deleteExpenseCategory } from "@/server/actions/expenseCategories";

type DeleteExpenseCategoryProps = {
  open: boolean;
  handleClose: () => void;
  expenseCategory: ExpenseCategory;
};

const DeleteExpenseCategory = ({
  open,
  handleClose,
  expenseCategory,
}: DeleteExpenseCategoryProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteExpenseCategory = async () => {
    setDeleting(true);
    try {
      const response = await deleteExpenseCategory(expenseCategory.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Expense Category deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Expense Category:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Expense Category"
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
            Delete Expense Category
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanently Delete{" "}
            <span className="font-semibold">{expenseCategory?.name}</span>
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
            onClick={handleDeleteExpenseCategory}
            className="cancelBtn text-white"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteExpenseCategory;
