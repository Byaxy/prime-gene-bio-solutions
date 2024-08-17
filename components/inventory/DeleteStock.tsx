import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Inventory } from "../Types";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteInventory } from "@/server/actions/inventory";

type DeleteStockProps = {
  open: boolean;
  handleClose: () => void;
  inventory: Inventory;
};
const DeleteStock = ({ open, handleClose, inventory }: DeleteStockProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete stock from product
  const handleDelete = async () => {
    setDeleting(true);

    const response = await deleteInventory(inventory.id);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Inventory deleted successfully");
    }

    setDeleting(false);
    handleClose();

    setDeleting(true);
    try {
      const response = await deleteInventory(inventory.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Inventory deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Inventory:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Inventory"
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
            Delete Product Stock
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Stock with{" "}
            <span className="font-semibold">
              Lot Number - {inventory.lotNumber}
            </span>{" "}
            from product{" "}
            <span className="font-semibold">{inventory.product}</span>
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
              handleDelete();
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

export default DeleteStock;
