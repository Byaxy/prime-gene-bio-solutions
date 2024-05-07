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
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";

const productsColumns = [
  {
    name: "Lot No.",
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

type ViewWayBillDetailsProps = {
  open: boolean;
  handleClose: () => void;
  wayBill: WayBill;
};
export default function ViewWayBillDetails({
  open,
  handleClose,
  wayBill,
}: ViewWayBillDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
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
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Customer
                </TableCell>
                <TableCell className="text-primaryDark text-[17px] font-semibold">
                  {wayBill.customer}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Date
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {new Date(wayBill.date).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Delivery Reference Number
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {wayBill.deliveryReferenceNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Address
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {wayBill.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Amount
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  ${wayBill.amount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Notes
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {wayBill.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Last updated
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {new Date(wayBill.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="py-5 flex flex-col gap-3">
            <span className="font-semibold text-primaryDark text-lg pl-5">
              Products Delivered
            </span>
            <DataTable
              columns={productsColumns}
              data={wayBill.products}
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
