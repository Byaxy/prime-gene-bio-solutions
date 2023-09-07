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
                <TableCell className="font-semibold text-lg">
                  Group ID
                </TableCell>
                <TableCell className="text-[17px]">{group.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px]">
                  {group.createdAt.toISOString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{group.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Percentage
                </TableCell>
                <TableCell className="text-[17px]">
                  {group.percentage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button size="large" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
