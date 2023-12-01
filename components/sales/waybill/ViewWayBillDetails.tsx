import React, { useEffect, useState } from "react";
import { allWayBillsData } from "@/data/allWayBillsData";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { WayBill } from "@/components/Types";

type ViewWayBillDetailsProps = {
  open: boolean;
  handleClose: () => void;
  wayBillID: string;
};
export default function ViewWayBillDetails({
  open,
  handleClose,
  wayBillID,
}: ViewWayBillDetailsProps) {
  const [wayBill, setWayBill] = useState<WayBill | null>(null);

  useEffect(() => {
    let wayBillDetails = allWayBillsData.data.find(
      (wayBill) => wayBill.id === wayBillID
    );
    if (wayBillDetails) {
      setWayBill(wayBillDetails);
    }
  }, [wayBillID]);

  if (!wayBill) {
    return null;
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Way Bill Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          {wayBill ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">Delivery ID</TableCell>
                  <TableCell>{wayBill.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell>{wayBill.date.toDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Delivery Reference Number
                  </TableCell>
                  <TableCell>{wayBill.deliveryReferenceNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Customer</TableCell>
                  <TableCell>{wayBill.customer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Address</TableCell>
                  <TableCell>{wayBill.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Products Delivered
                  </TableCell>
                  <TableCell>
                    <ul className="pl-5 m-0">
                      {wayBill?.products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Notes</TableCell>
                  <TableCell>{wayBill.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : null}
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
