import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { expenseCategoriesData } from "@/data/expenseCategoriesData";
import { ExpenseCategory } from "@/components/Types";

type DataCells = Omit<ExpenseCategory, "isActive" | "updatedAt">;

type ViewExpenseCategoryProps = {
  open: boolean;
  handleClose: () => void;
  expenseCategoryID: string;
};

export default function ViewExpenseCategory({
  open,
  handleClose,
  expenseCategoryID,
}: ViewExpenseCategoryProps) {
  const [category, setCategory] = useState<DataCells | null>(null);

  useEffect(() => {
    let expenseCategory = expenseCategoriesData.data.find(
      (expense) => expense.id === expenseCategoryID
    );
    if (expenseCategory) {
      setCategory(expenseCategory);
    }
  }, [expenseCategoryID]);

  if (!category) {
    return null;
  }
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
                <TableCell className="font-semibold text-lg">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px]">
                  {category.createdAt.toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{category.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Code</TableCell>
                <TableCell className="text-[17px]">{category.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Description
                </TableCell>
                <TableCell className="text-[17px]">
                  {category.description}
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
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
