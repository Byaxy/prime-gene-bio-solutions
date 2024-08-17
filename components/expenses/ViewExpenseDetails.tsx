import React, { useEffect, useState } from "react";
import type { Expense } from "../Types";
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
import Image from "next/image";
import { CldImage } from "next-cloudinary";

type ViewExpenseDetailsProps = {
  open: boolean;
  handleClose: () => void;
  expense: Expense;
};

export default function ViewExpenseDetails({
  open,
  handleClose,
  expense,
}: ViewExpenseDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                  {new Date(expense.date).toDateString()}
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
                  ${expense.amount}
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
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Created on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark w-fit">
                  {new Date(expense.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Last updated on
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(expense.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex flex-col gap-5 pt-5">
            <p className="font-semibold text-lg text-primaryDark">Attachment</p>
            {expense.image ? (
              <CldImage
                className="rounded"
                src={expense.image}
                alt="Product Image"
                height={300}
                width={300}
              />
            ) : (
              <Image
                src={"/placeholder.jpg"}
                alt="Preview"
                width={300}
                height={300}
                className="rounded-lg"
              />
            )}
          </div>
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
