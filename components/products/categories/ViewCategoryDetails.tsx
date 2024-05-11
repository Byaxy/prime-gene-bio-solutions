import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ProductCategory } from "@/components/Types";
import { customTableStyles } from "@/styles/TableStyles";

type ViewCategoryDetailsProps = {
  open: boolean;
  handleClose: () => void;
  category: ProductCategory;
};

export default function ViewCategoryDetails({
  open,
  handleClose,
  category,
}: ViewCategoryDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Product Category Details
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
                  Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {category.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Code
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {category.code}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Parent category
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {category.parentCategory ? category.parentCategory : "Null"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Description
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {category.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Created on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(category.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last updated on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(category.updatedAt).toDateString()}
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
