import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { SaleReturn } from "@/components/Types";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";

type DeleteReturnProps = {
  open: boolean;
  handleClose: () => void;
  saleReturn: SaleReturn;
};
const DeleteReturn = ({ open, handleClose, saleReturn }: DeleteReturnProps) => {
  const deleteSaleReturn = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/sales-returns/${saleReturn.id}`
      );
      if (response.status === 200) {
        toast.success("Sale Return Deleted Successfully");
      }
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
            Delete Sale Return
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Sale Return with{" "}
            <span className="font-semibold">
              Sale Invoice No. {saleReturn?.saleInvoiceNumber} and
            </span>{" "}
            <span className="font-semibold">
              Delivery Reverence No. {saleReturn?.deliveryReferenceNumber}
            </span>{" "}
            to <span className="font-semibold">{saleReturn?.customer}</span>
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
              deleteSaleReturn();
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

export default DeleteReturn;
