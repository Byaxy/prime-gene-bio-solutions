import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Unit } from "@/components/Types";

type ViewUnitDetailsProps = {
  open: boolean;
  handleClose: () => void;
  unit: Unit;
};

export default function ViewUnitDetails({
  open,
  handleClose,
  unit,
}: ViewUnitDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Unit Details
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
                <TableCell className="tableTitle">Name</TableCell>
                <TableCell className="tableValue">{unit.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tableTitle">Code</TableCell>
                <TableCell className="tableValue">{unit.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tableTitle">Created on</TableCell>
                <TableCell className="tableValue">
                  {new Date(unit.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="tableTitle">Last updated on</TableCell>
                <TableCell className="tableValue">
                  {new Date(unit.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
