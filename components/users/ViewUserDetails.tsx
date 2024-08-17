import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { User } from "../Types";

type ViewUserDetailsProps = {
  open: boolean;
  handleClose: () => void;
  user: User;
};

export default function ViewUserDetails({
  open,
  handleClose,
  user,
}: ViewUserDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            User Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Role
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark uppercase font-semibold">
                  {user.role}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Email
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Phone Number
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user?.phone || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Created On
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(user?.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last Updated On
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(user?.updatedAt).toDateString()}
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
