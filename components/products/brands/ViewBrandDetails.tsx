import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Brand } from "@/components/Types";
import axios from "axios";
import { CldImage } from "next-cloudinary";

type ViewBrandDetailsProps = {
  open: boolean;
  handleClose: () => void;
  brand: Brand;
};

export default function ViewBrandDetails({
  open,
  handleClose,
  brand,
}: ViewBrandDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Brand Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-10">
            <CldImage
              alt="Brand Image"
              src={brand.image}
              height={120}
              width={300}
              crop="fit"
              className="rounded-lg"
            />
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Date of Registration
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {new Date(brand.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Name
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {brand.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Code
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {brand.code}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Last Updated At
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {new Date(brand.updatedAt).toDateString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
