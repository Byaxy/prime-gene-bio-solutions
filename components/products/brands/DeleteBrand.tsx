import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { Brand } from "@/components/Types";
import toast from "react-hot-toast";
import { deleteBrand } from "@/server/actions/brands";

type DeleteBrandProps = {
  open: boolean;
  handleClose: () => void;
  brand: Brand;
};

const DeleteBrand = ({ open, handleClose, brand }: DeleteBrandProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete Brand from the database
  const handleDeleteBrand = async () => {
    setDeleting(true);
    try {
      const response = await deleteBrand(brand.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Brand deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Brand:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Brand"
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
            Delete Brand
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{brand?.name}</span>
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
              handleDeleteBrand();
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

export default DeleteBrand;
