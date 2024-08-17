import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { Customer } from "@/components/Types";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteCustomer } from "@/server/actions/customers";

type DeleteCustomerProps = {
  open: boolean;
  handleClose: () => void;
  customer: Customer;
};

const DeleteCustomer = ({
  open,
  handleClose,
  customer,
}: DeleteCustomerProps) => {
  const [deleting, setDeleting] = useState(false);

  // Delete customer
  const handleDeleteCustomer = async () => {
    setDeleting(true);
    try {
      const response = await deleteCustomer(customer.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Customer deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting Customer:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the Customer"
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
            <span className="font-semibold">{customer?.name}</span>
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
              handleDeleteCustomer();
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

export default DeleteCustomer;
