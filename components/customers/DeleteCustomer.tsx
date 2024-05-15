import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { Customer } from "@/components/Types";
import toast from "react-hot-toast";
import { DB } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

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
  // Delete customer
  const deleteCustomer = async () => {
    try {
      await DB.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCustomersCollectionId,
        customer.id
      ).then(() => {
        toast.success("Customer Deleted Successfully");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
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
              deleteCustomer();
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

export default DeleteCustomer;
