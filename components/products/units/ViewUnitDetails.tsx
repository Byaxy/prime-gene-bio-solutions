import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { unitsData } from "@/data/unitsData";
import type { Unit } from "@/components/Types";

type ViewUnitDetailsProps = {
  open: boolean;
  handleClose: () => void;
  unitID: string;
};

export default function ViewUnitDetails({
  open,
  handleClose,
  unitID,
}: ViewUnitDetailsProps) {
  const [unit, setUnit] = useState<Unit | null>(null);

  useEffect(() => {
    let unitDetails = unitsData.find((unit) => unit.id === unitID);
    if (unitDetails) {
      setUnit(unitDetails);
    }
  }, [unitID]);

  if (!unit) {
    return null;
  }
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
          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px]">
                  {unit.createdAt.toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{unit.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Code</TableCell>
                <TableCell className="text-[17px]">{unit.code}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
