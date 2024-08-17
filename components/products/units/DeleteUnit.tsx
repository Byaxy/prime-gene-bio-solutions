import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { Unit } from "@/components/Types";
import toast from "react-hot-toast";
import { deleteUnit } from "@/server/actions/units";

type DeleteUnitProps = {
  open: boolean;
  handleClose: () => void;
  unit: Unit;
};
const DeleteUnit = ({ open, handleClose, unit }: DeleteUnitProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete Unit from the database
  const handleDeleteUnit = async () => {
    setDeleting(true);
    try {
      const response = await deleteUnit(unit.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Unit deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Unit:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Unit"
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
            Delete Unit
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{unit?.name}</span>
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
            onClick={handleDeleteUnit}
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

export default DeleteUnit;
