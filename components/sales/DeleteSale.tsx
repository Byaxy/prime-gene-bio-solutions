import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Sale } from "../Types";
import axios from "axios";
import toast from "react-hot-toast";

type DeleteSaleProps = {
  open: boolean;
  handleClose: () => void;
  sale: Sale;
};
const DeleteSale = ({ open, handleClose, sale }: DeleteSaleProps) => {
  // delete Sale
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/sales/${sale.id}`
      );
      if (response.status === 200) {
        toast.success("Sale Deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <span className="text-2xl text-primaryDark font-bold">
            Delete Sale
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Sale with{" "}
            <span className="font-semibold">
              Invoice Number - {sale.invoiceNumber}
            </span>{" "}
            to customer <span className="font-semibold">{sale.customer}</span>
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
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteSale;
