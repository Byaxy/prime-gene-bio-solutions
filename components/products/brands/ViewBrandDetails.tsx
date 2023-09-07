import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { brandsData } from "@/data/brandsData";
import Image from "next/image";
import { Brand } from "@/components/Types";

type ViewBrandDetailsProps = {
  open: boolean;
  handleClose: () => void;
  brandID: string;
};

type DataCells = Omit<Brand, "updatedAt" | "isActive">;

export default function ViewBrandDetails({
  open,
  handleClose,
  brandID,
}: ViewBrandDetailsProps) {
  const [brand, setBrand] = useState<DataCells | null>(null);

  useEffect(() => {
    let brandDetails = brandsData.data.filter((brand) => brand.id === brandID);
    if (brandDetails) {
      setBrand(brandDetails[0]);
    }
  }, [brandID]);

  if (!brand) {
    return null;
  }
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
          <Image alt="" src={brand.image} height={120} width={250} />
          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Brand ID
                </TableCell>
                <TableCell className="text-[17px]">{brand.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px]">
                  {brand.createdAt.toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{brand.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Code</TableCell>
                <TableCell className="text-[17px]">{brand.code}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
