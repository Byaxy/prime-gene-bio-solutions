import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Inventory } from "@/components/Types";

type ViewStockDetailsProps = {
  open: boolean;
  handleClose: () => void;
  inventory: Inventory;
};

export default function ViewProductStockDetails({
  open,
  handleClose,
  inventory,
}: ViewStockDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Product Stock Details
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
                  Product Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {inventory.product}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Lot Number
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {inventory.lotNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Quantity
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {inventory.quantity} {inventory.unit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Cost Price
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  ${inventory.cost}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Selling Price
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  ${inventory.price}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Manufacture Date
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {inventory.manufactureDate
                    ? new Date(inventory.manufactureDate).toDateString()
                    : "Null"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Expiry Date
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {inventory.expiryDate
                    ? new Date(inventory.expiryDate).toDateString()
                    : "Null"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Created on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark w-fit">
                  {new Date(inventory.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last updated on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(inventory.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            className="cancelBtn"
            size="large"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
