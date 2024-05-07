import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Quotation } from "../Types";
import axios from "axios";
import toast from "react-hot-toast";

type DeleteQuotationProps = {
  open: boolean;
  handleClose: () => void;
  quotation: Quotation;
};
const DeleteQuotation = ({
  open,
  handleClose,
  quotation,
}: DeleteQuotationProps) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/quotations/${quotation.id}`
      );
      if (response.status === 200) {
        toast.success("Quotation Deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      {" "}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <span className="text-2xl text-primaryDark font-bold">
            Delete Sale
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Quotation with{" "}
            <span className="font-semibold">
              Quotation Number - {quotation.quotationNumber}
            </span>{" "}
            to customer{" "}
            <span className="font-semibold">{quotation.customer}</span>
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

export default DeleteQuotation;
