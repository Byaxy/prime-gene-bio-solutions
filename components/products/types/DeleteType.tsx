import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { ProductType } from "@/components/Types";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteType } from "@/server/actions/types";

type DeleteTypeProps = {
  open: boolean;
  handleClose: () => void;
  type: ProductType;
};

const DeleteType = ({ open, handleClose, type }: DeleteTypeProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete Type from the database
  const handleDeleteType = async () => {
    setDeleting(true);
    try {
      const response = await deleteType(type.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Type deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Type:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Type"
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
            Delete Type
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{type?.name}</span>
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
              handleDeleteType();
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

export default DeleteType;
