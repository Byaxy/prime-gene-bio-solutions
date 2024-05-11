import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { typesData } from "@/data/typesData";
import type { ProductType } from "@/components/Types";
import axios from "axios";
import toast from "react-hot-toast";

type ViewTypeDetailsProps = {
  open: boolean;
  handleClose: () => void;
  type: ProductType;
};

export default function ViewTypeDetails({
  open,
  handleClose,
  type,
}: ViewTypeDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Type Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {type.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Code
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {type.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Created On
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(type.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last Updated On
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(type.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={handleClose}
            className="cancelBtn"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
