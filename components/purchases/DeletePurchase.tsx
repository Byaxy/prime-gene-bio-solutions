import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Purchase } from "@/components/Types";
import axios from "axios";
import toast from "react-hot-toast";

type DeletePurchaseProps = {
  open: boolean;
  handleClose: () => void;
  purchase: Purchase;
};

const DeletePurchase = ({
  open,
  handleClose,
  purchase,
}: DeletePurchaseProps) => {
  const deletePurchase = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/purchases/${purchase.id}`
      );
      if (response.status === 200) {
        toast.success("Purchase Deleted Successfully");
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
            Delete Purchase
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Purchase with{" "}
            <span className="font-semibold">
              Purchase Order Numbe {purchase?.purchaseOrderNumber}
            </span>{" "}
            from <span className="font-semibold">{purchase?.supplier}</span>
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
              deletePurchase();
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

export default DeletePurchase;
