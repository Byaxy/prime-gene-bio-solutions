import React, { useEffect, useState } from "react";
import type { Expense } from "../Types";
import { allExpensesData } from "@/data/allExpensesData";
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

type ViewExpenseDetailsProps = {
  open: boolean;
  handleClose: () => void;
  expenseID: string;
};

export default function ViewExpenseDetails({
  open,
  handleClose,
  expenseID,
}: ViewExpenseDetailsProps) {
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    let expenseDetails = allExpensesData.data.filter(
      (expense) => expense.id === expenseID
    );
    if (expenseDetails) {
      setExpense(expenseDetails[0]);
    }
  }, [expenseID]);

  if (!expense) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Expense Details
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
                  Date
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expense.date.toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Receipt Number
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expense.reference}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Title
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expense.title}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Amount
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expense.amount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Description
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {expense.description}
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
