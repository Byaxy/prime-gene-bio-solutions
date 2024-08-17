import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { ExpenseCategory } from "@/components/Types";

type DataCells = Omit<ExpenseCategory, "isActive" | "updatedAt">;

type ViewExpenseCategoryProps = {
  open: boolean;
  handleClose: () => void;
  expenseCategory: ExpenseCategory;
};

export default function ViewExpenseCategory({
  open,
  handleClose,
  expenseCategory,
}: ViewExpenseCategoryProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Expense Category Details
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
                  Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expenseCategory.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Code
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expenseCategory.code}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Description
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expenseCategory.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Created on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark w-fit">
                  {new Date(expenseCategory.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last updated on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(expenseCategory.updatedAt).toDateString()}
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
