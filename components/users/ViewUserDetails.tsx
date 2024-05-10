import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { usersData } from "@/data/usersData";
import Image from "next/image";
import { User } from "../Types";

type ViewUserDetailsProps = {
  open: boolean;
  handleClose: () => void;
  userID: string;
};

export default function ViewUserDetails({
  open,
  handleClose,
  userID,
}: ViewUserDetailsProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let userDetails = usersData.find((user) => user.id === userID);
    if (userDetails) {
      setUser(userDetails);
    }
  }, [userID]);

  if (!user) {
    return null;
  }
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
                <TableCell className="text-[17px] text-primaryDark">
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
                  {user?.phone}
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
