import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { customerGroupsData } from "@/data/customerGroupsData";
import { CustomerGroups } from "@/components/Types";

type ViewCustomerGroupsDetailsProps = {
  open: boolean;
  handleClose: () => void;
  groupID: string;
};
type DataCells = Omit<CustomerGroups, "updatedAt" | "isActive">;

export default function ViewCustomerGroupDetails({
  open,
  handleClose,
  groupID,
}: ViewCustomerGroupsDetailsProps) {
  const [group, setGroup] = useState<DataCells | null>(null);

  useEffect(() => {
    let groupDetails = customerGroupsData.data.filter(
      (group) => group.id === groupID
    );
    if (groupDetails) {
      setGroup(groupDetails[0]);
    }
  }, [groupID]);

  if (!group) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Group Details
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
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Group ID
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {group.id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {group.createdAt.toISOString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {group.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Percentage
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {group.percentage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            onClick={handleClose}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white border-0 hover:border-0"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
