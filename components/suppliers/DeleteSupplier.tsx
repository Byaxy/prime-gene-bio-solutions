import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { Supplier } from "@/components/Types";
import toast from "react-hot-toast";
import axios from "axios";
import { deleteSupplier } from "@/server/actions/suppliers";

type DeleteSupplierProps = {
  open: boolean;
  handleClose: () => void;
  supplier: Supplier;
};

const DeleteSupplier = ({
  open,
  handleClose,
  supplier,
}: DeleteSupplierProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete supplier
  const handleDeleteSupplier = async () => {
    setDeleting(true);
    try {
      const response = await deleteSupplier(supplier.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Supplier deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Supplier:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Supplier"
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
            Delete Supplier
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{supplier?.name}</span>
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
            onClick={() => handleDeleteSupplier()}
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

export default DeleteSupplier;
