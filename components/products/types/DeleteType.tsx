import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import type { ProductType } from "@/components/Types";
import toast from "react-hot-toast";
import { DB } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

type DeleteTypeProps = {
  open: boolean;
  handleClose: () => void;
  type: ProductType;
};

const DeleteType = ({ open, handleClose, type }: DeleteTypeProps) => {
  const deleteType = async () => {
    try {
      await DB.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteProductTypesCollectionId,
        type.id
      ).then(() => {
        toast.success("Type Deleted Successfully");
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
            Delete Type
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete{" "}
            <span className="font-semibold">{type?.name}</span>
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
              deleteType();
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

export default DeleteType;
