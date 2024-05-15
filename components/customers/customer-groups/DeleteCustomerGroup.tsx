import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { CustomerGroup } from "@/components/Types";
import toast from "react-hot-toast";
import { DB } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

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
  // Delete customer group
  const deleteCustomerGroup = async () => {
    try {
      await DB.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCustomerGroupsCollectionId,
        group.id
      ).then(() => {
        toast.success("Customer Group Deleted Successfully");
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
              deleteCustomerGroup();
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

export default DeleteCustomerGroup;
