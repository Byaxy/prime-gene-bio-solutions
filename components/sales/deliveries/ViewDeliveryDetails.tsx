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
import type { Delivery } from "@/components/Types";
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";

type ViewDeliveryDetailsProps = {
  open: boolean;
  handleClose: () => void;
  delivery: Delivery;
};

const productsColumns = [
  {
    name: "Lot Number",
    selector: (row: { lotNumber: string }) => row.lotNumber,
    width: "120px",
  },
  {
    name: "Product Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Qnty Requested",
    cell: (row: { quantityRequested: number; unit: string }) => (
      <span>
        {row.quantityRequested} {row.unit}
      </span>
    ),

    width: "150px",
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
  {
    name: "Qnty Supplied",
    cell: (row: { quantitySupplied: number; unit: string }) => (
      <span>
        {row.quantitySupplied} {row.unit}
      </span>
    ),
    width: "140px",
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
  {
    name: "Balance Left",
    cell: (row: {
      quantitySupplied: number;
      quantityRequested: number;
      unit: string;
    }) => (
      <span>
        {row.quantityRequested - row.quantitySupplied} {row.unit}
      </span>
    ),
    width: "140px",
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
];

export default function ViewDeliveryDetails({
  open,
  handleClose,
  delivery,
}: ViewDeliveryDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
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
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Customer
                </TableCell>
                <TableCell className="text-primaryDark text-[17px] font-semibold">
                  {delivery.customer}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Delivery Date
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {new Date(delivery.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Sale Invoice Number
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {delivery.saleInvoiceNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Delivery Reference Number
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {delivery.deliveryReferenceNumber}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Address
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {delivery.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Status
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {delivery.status}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Note
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {delivery.description}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="py-5 flex flex-col gap-3">
            <span className="font-semibold text-primaryDark text-lg pl-5">
              Products
            </span>
            <DataTable
              columns={productsColumns}
              data={delivery.products}
              customStyles={viewTableStyles}
              noDataComponent={
                <div className="w-full text-center text-primaryDark font-semibold">
                  No Products To Display
                </div>
              }
            />
          </div>
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
