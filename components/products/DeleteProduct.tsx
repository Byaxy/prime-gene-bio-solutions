import type { Product } from "../Types";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { deleteProduct } from "@/server/actions/products";

type DeleteProductProps = {
  open: boolean;
  handleClose: () => void;
  product: Product;
};
const DeleteProduct = ({ open, handleClose, product }: DeleteProductProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete product
  const handleDeleteProduct = async () => {
    setDeleting(true);
    try {
      const response = await deleteProduct(product.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Product deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Product:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Product"
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
            Delete Product
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{product?.name}</span>
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
              handleDeleteProduct();
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

export default DeleteProduct;
