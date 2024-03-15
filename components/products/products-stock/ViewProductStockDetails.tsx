import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";
import { ProductStock } from "@/components/Types";
import { productsStockData } from "@/data/productsStockData";

type ProductStockType = Omit<ProductStock, "isActive" | "updatedAt">;

type ViewStockDetailsProps = {
  open: boolean;
  handleClose: () => void;
  stockID: string;
};

export default function ViewProductStockDetails({
  open,
  handleClose,
  stockID,
}: ViewStockDetailsProps) {
  const [productStock, setProductStock] = useState<ProductStockType | null>(
    null
  );

  useEffect(() => {
    let productStockDetails = productsStockData.find(
      (stock) => stock.id === stockID
    );
    if (productStockDetails) {
      setProductStock(productStockDetails);
    }
  }, [stockID]);

  if (!productStock) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Product Stock Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <Table size="medium" className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg">ID</TableCell>
                <TableCell className="text-[17px]">{productStock.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold w-[150px] text-lg">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.createdAt.toISOString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Lot Number
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.lotNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Manufacture Date
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.manufactureDate.toISOString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Expiry Date
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.expiryDate.toISOString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Quantity
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.quantity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Purchase Order Number
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.reference}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Description
                </TableCell>
                <TableCell className="text-[17px]">
                  {productStock.description}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
