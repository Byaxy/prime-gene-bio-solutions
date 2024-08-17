import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { CustomerGroup } from "@/components/Types";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteCustomerGroup } from "@/server/actions/customerGroups";

type DeleteCustomerGroupProps = {
  open: boolean;
  handleClose: () => void;
  group: CustomerGroup;
};

const DeleteCustomerGroup = ({
  open,
  handleClose,
  group,
}: DeleteCustomerGroupProps) => {
  const [deleting, setDeleting] = useState(false);

  // Delete customer group
  const handleDeleteCustomerGroup = async () => {
    setDeleting(true);
    try {
      const response = await deleteCustomerGroup(group.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Customer Group deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Customer Group:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Customer Group"
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
            Delete Customer
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{group?.name}</span>
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
              handleDeleteCustomerGroup();
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

export default DeleteCustomerGroup;
