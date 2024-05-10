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
import type { WayBill } from "@/components/Types";
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";
import toast from "react-hot-toast";
import axios from "axios";

type DeleteWayBillProps = {
  open: boolean;
  handleClose: () => void;
  wayBill: WayBill;
};

const DeleteWayBill = ({ open, handleClose, wayBill }: DeleteWayBillProps) => {
  const deleteWayBill = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/waybills/${wayBill.id}`
      );
      if (response.status === 200) {
        toast.success("Way Bill Deleted Successfully");
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
            Delete Way Bill
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Way Bill with{" "}
            <span className="font-semibold">
              Delivery Reverence No. {wayBill?.deliveryReferenceNumber}
            </span>{" "}
            to <span className="font-semibold">{wayBill?.customer}</span>
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
              deleteWayBill();
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

export default DeleteWayBill;
