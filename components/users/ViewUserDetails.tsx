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
          <Image alt="User" src={user.image} height={200} width={200} />
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
                  First Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user.firstName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user.lastName}
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
                  {user.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Gender
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user.gender}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Status
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {user.isActive ? "Active" : "Not Active"}
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
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
