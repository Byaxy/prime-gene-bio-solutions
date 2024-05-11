import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { ProductCategory } from "@/components/Types";
import toast from "react-hot-toast";
import { DB } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

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
  const deleteCategory = async () => {
    try {
      await DB.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteProductCategoriesCollectionId,
        category.id
      ).then(() => {
        toast.success("Product Category Deleted Successfully");
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong");
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
              deleteCategory();
              handleClose();
            }}
            className="cancelBtn"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCategory;
