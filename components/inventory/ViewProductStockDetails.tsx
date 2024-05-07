import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ProductWithStock } from "@/components/Types";

type ViewStockDetailsProps = {
  open: boolean;
  handleClose: () => void;
  stock: ProductWithStock;
};

export default function ViewProductStockDetails({
  open,
  handleClose,
  stock,
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
                  {stock.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Product Code
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {stock.code}
                </TableCell>
              </TableRow>
              {stock.stock?.id ? (
                <>
                  <TableRow>
                    <TableCell className="font-semibold text-lg text-primaryDark">
                      Date of Registration
                    </TableCell>
                    <TableCell className="text-[17px] text-primaryDark w-fit">
                      {new Date(stock.stock.createdAt).toDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-lg text-primaryDark">
                      Lot Number
                    </TableCell>
                    <TableCell className="text-[17px] text-primaryDark">
                      {stock.stock.lotNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-lg text-primaryDark">
                      Manufacture Date
                    </TableCell>
                    <TableCell className="text-[17px] text-primaryDark">
                      {new Date(stock.stock.manufactureDate).toDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-lg text-primaryDark">
                      Expiry Date
                    </TableCell>
                    <TableCell className="text-[17px] text-primaryDark">
                      {new Date(stock.stock.expiryDate).toDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-lg text-primaryDark">
                      Quantity
                    </TableCell>
                    <TableCell className="text-[17px] text-primaryDark">
                      {stock.stock.quantity}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-lg text-primaryDark">
                      Last Updated
                    </TableCell>
                    <TableCell className="text-[17px] text-primaryDark">
                      {new Date(stock.stock.updatedAt).toDateString()}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    No Stock Registered
                  </TableCell>
                  <TableCell />
                </TableRow>
              )}
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
