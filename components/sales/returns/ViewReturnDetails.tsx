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
import type { SaleReturn } from "@/components/Types";
import DataTable from "react-data-table-component";
import { viewTableStyles } from "@/styles/TableStyles";

const columns = [
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Lot No.",
    selector: (row: { lotNumber: string }) => row.lotNumber,
    width: "120px",
  },
  {
    name: "Qnty Requested",
    cell: (row: { quantityRequested: number; unit: string }) => (
      <span>
        {row.quantityRequested}
        {row.unit}
      </span>
    ),
    width: "140px",
  },
  {
    name: "Qnty Supplied",
    cell: (row: { quantitySupplied: number; unit: string }) => (
      <span>
        {row.quantitySupplied}
        {row.unit}
      </span>
    ),
    width: "140px",
  },
  {
    name: "Qnty Returned",
    cell: (row: { quantityReturned: number; unit: string }) => (
      <span>
        {row.quantityReturned}
        {row.unit}
      </span>
    ),
    width: "140px",
  },
  {
    name: "Sub Total",
    cell: (row: { subTotal: number }) => <span>${row.subTotal}</span>,
    width: "120px",
  },
];

type ViewReturnDetailsProps = {
  open: boolean;
  handleClose: () => void;
  saleReturn: SaleReturn;
};
const ViewReturnDetails = ({
  open,
  handleClose,
  saleReturn,
}: ViewReturnDetailsProps) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Sale Return Details
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
                  {saleReturn.customer}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Date
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {new Date(saleReturn.date).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Sale Invoice Number
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {saleReturn.saleInvoiceNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Delivery Reference Number
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {saleReturn.deliveryReferenceNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Total Amount Returned
                </TableCell>
                <TableCell className="text-primaryDark text-[17px] font-semibold">
                  ${saleReturn.total}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Notes
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {saleReturn.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-primaryDark text-lg">
                  Last updated
                </TableCell>
                <TableCell className="text-primaryDark text-[17px]">
                  {new Date(saleReturn.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="py-5 flex flex-col gap-3">
            <span className="font-semibold text-primaryDark text-lg pl-5">
              Products Delivered
            </span>
            <DataTable
              columns={columns}
              data={saleReturn.products}
              customStyles={viewTableStyles}
              noDataComponent={
                <div className="w-full text-center text-primaryDark font-semibold">
                  No Products To Display
                </div>
              }
            />
          </div>
          <div className="flex flex-row items-center justify-end gap-14 px-5 py-6">
            <span className="text-primaryDark font-bold text-xl">
              Total Returned:
            </span>
            <span className="text-primaryDark font-bold text-xl">
              ${saleReturn.total}
            </span>
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
};

export default ViewReturnDetails;
