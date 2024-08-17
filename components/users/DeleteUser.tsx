import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { User } from "../Types";
import { useState } from "react";
import { deleteUser } from "@/server/actions/users";
import toast from "react-hot-toast";

type DeleteUserProps = {
  open: boolean;
  handleClose: () => void;
  user: User;
};

const DeleteUser = ({ open, handleClose, user }: DeleteUserProps) => {
  const [deleting, setDeleting] = useState(false);

  // delete User from the database
  const handleDeleteUser = async () => {
    setDeleting(true);
    try {
      const response = await deleteUser(user.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("User deleted successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the User"
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
            Delete User
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{user?.name}</span>
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
            onClick={handleDeleteUser}
            className="cancelBtn text-white"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
