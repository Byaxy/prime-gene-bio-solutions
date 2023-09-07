import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { suppliersData } from "@/data/suppliersData";

type SupplierType = {
  companyName: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

type ViewSupplierDetailsProps = {
  open: boolean;
  handleClose: () => void;
  supplierID: string;
};

export default function ViewSupplierDetails({
  open,
  handleClose,
  supplierID,
}: ViewSupplierDetailsProps) {
  const [supplier, setSupplier] = useState<SupplierType | null>(null);

  useEffect(() => {
    let supplierDetails = suppliersData.data.filter(
      (supplier) => supplier.id === supplierID
    );
    if (supplierDetails) {
      setSupplier(supplierDetails[0]);
    }
  }, [supplierID]);

  if (!supplier) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Company Name
                </TableCell>
                <TableCell className="text-[17px]">
                  {supplier.companyName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{supplier.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Email</TableCell>
                <TableCell className="text-[17px]">{supplier.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Phone</TableCell>
                <TableCell className="text-[17px]">
                  {supplier.phoneNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Address</TableCell>
                <TableCell className="text-[17px]">
                  {supplier.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">City</TableCell>
                <TableCell className="text-[17px]">{supplier.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Country</TableCell>
                <TableCell className="text-[17px]">
                  {supplier.country}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
