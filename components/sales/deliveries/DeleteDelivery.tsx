import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Delivery } from "@/components/Types";
import axios from "axios";
import toast from "react-hot-toast";

type DeleteDeliveryProps = {
  open: boolean;
  handleClose: () => void;
  delivery: Delivery;
};

const DeleteDelivery = ({
  open,
  handleClose,
  delivery,
}: DeleteDeliveryProps) => {
  const deleteDelivery = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deliveries/${delivery.id}`
      );
      if (response.status === 200) {
        toast.success("Delivery Deleted Successfully");
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
            Delete Deleivery
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Delivery with{" "}
            <span className="font-semibold">
              Delivery Reverence No. {delivery?.deliveryReferenceNumber}
            </span>{" "}
            to <span className="font-semibold">{delivery?.customer}</span>
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
              deleteDelivery();
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

export default DeleteDelivery;
