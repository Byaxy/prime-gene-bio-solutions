import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { customersData } from "@/data/customersData";

type CustomerType = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
};

type ViewCustomerDetailsProps = {
  open: boolean;
  handleClose: () => void;
  customerID: string;
};

export default function ViewCustomerDetails({
  open,
  handleClose,
  customerID,
}: ViewCustomerDetailsProps) {
  const [customer, setCustomer] = useState<CustomerType | null>(null);

  useEffect(() => {
    let customerDetails = customersData.data.filter(
      (customer) => customer.id === customerID
    );
    if (customerDetails) {
      setCustomer(customerDetails[0]);
    }
  }, [customerID]);

  if (!customer) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Customer Details
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
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{customer.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Email</TableCell>
                <TableCell className="text-[17px]">{customer.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Phone</TableCell>
                <TableCell className="text-[17px]">
                  {customer.phoneNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Address</TableCell>
                <TableCell className="text-[17px]">
                  {customer.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">City</TableCell>
                <TableCell className="text-[17px]">{customer.city}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
