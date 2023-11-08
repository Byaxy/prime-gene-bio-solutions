import React, { useEffect, useState } from "react";
import { allDeliveriesData } from "@/data/allDeliveriesData";
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

type ViewDeliveryDetailsProps = {
  open: boolean;
  handleClose: () => void;
  deliveryID: string;
};

type Delivery = {
  id: string;
  date: Date;
  saleInvoiceNumber: string;
  deliveryReferenceNumber: string;
  itemDescription: string;
  customer: string;
  address: string;
  status: string;
};
export default function ViewDeliveryDetails({
  open,
  handleClose,
  deliveryID,
}: ViewDeliveryDetailsProps) {
  const [delivery, setDeliveryID] = useState<Delivery | null>(null);

  useEffect(() => {
    let deliveryDetails = allDeliveriesData.data.filter(
      (delivery) => delivery.id === deliveryID
    );
    if (deliveryDetails) {
      setDeliveryID(deliveryDetails[0]);
    }
  }, [deliveryID]);

  if (!delivery) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Delivery Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          {delivery ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">Delivery ID</TableCell>
                  <TableCell>{delivery.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell>{delivery.date.toDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Sale Invoice Number
                  </TableCell>
                  <TableCell>{delivery.saleInvoiceNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Delivery Reference Number
                  </TableCell>
                  <TableCell>{delivery.deliveryReferenceNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Item Description
                  </TableCell>
                  <TableCell>{delivery.itemDescription}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Customer</TableCell>
                  <TableCell>{delivery.customer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Address</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell>{delivery.status}</TableCell>
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
