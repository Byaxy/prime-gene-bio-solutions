import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Supplier } from "../Types";

type ViewSupplierDetailsProps = {
  open: boolean;
  handleClose: () => void;
  supplier: Supplier;
};

export default function ViewSupplierDetails({
  open,
  handleClose,
  supplier,
}: ViewSupplierDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Supplier Details
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
                  {supplier.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Email
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Phone Number
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Status
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.isActive ? "Active" : "Not Active"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Address
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  City
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.city}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  State
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.state}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Country
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {supplier.country}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <h3 className="text-2xl text-primaryDark font-bold mb-0 mt-10 px-4">
            Contact Person Details
          </h3>
          {supplier.contactPerson ? (
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Name
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {supplier.contactPerson?.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Email
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {supplier.contactPerson?.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Phone Number
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {supplier.contactPerson?.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Status
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {supplier.contactPerson?.isActive ? "Active" : "Not Active"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <span className="font-semibold text-lg text-primaryDark px-4 py-6 block">
              No Contact Person
            </span>
          )}
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
