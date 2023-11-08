import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";
import { allProductsData } from "@/data/allProductsData";
import type { Product } from "@/components/Types";

type ProductType = {
  date: string;
  code: string;
  name: string;
  image: string;
  brand: string;
  type: string;
  category: string;
  cost: number;
  price: number;
  quantity: number | null;
  unit: string;
  alertQuantity: number;
};

type ViewProductDetailsProps = {
  open: boolean;
  handleClose: () => void;
  productID: string;
};

export default function ViewProductDetails({
  open,
  handleClose,
  productID,
}: ViewProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let productDetails = allProductsData.data.filter(
      (product) => product.id === productID
    );
    if (productDetails) {
      setProduct(productDetails[0]);
    }
  }, [productID]);

  if (!product) {
    return null;
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Product Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative object-cover overflow-hidden flex-1 max-h-[220px] min-w-[120px] min-h-[120px]">
              <Image alt="" src={product.image} fill />
            </div>
            <Table size="medium" className="flex-[1.75]">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold w-[150px] text-lg">
                    Date of Registration
                  </TableCell>
                  <TableCell className="text-[17px]">
                    {product.createdAt.toDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Name</TableCell>
                  <TableCell className="text-[17px]">{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Code</TableCell>
                  <TableCell className="text-[17px]">{product.code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">
                    Category
                  </TableCell>
                  <TableCell className="text-[17px]">
                    {product.category}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Brand</TableCell>
                  <TableCell className="text-[17px]">{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Type</TableCell>
                  <TableCell className="text-[17px]">{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Unit</TableCell>
                  <TableCell className="text-[17px]">{product.unit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Cost</TableCell>
                  <TableCell className="text-[17px]">
                    {product.cost.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">Price</TableCell>
                  <TableCell className="text-[17px]">
                    {product.price.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">
                    Quantity
                  </TableCell>
                  <TableCell className="text-[17px]">
                    {product.stock.reduce(
                      (total, stock) => total + stock.quantity,
                      0
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg">
                    Alert Quantity
                  </TableCell>
                  <TableCell className="text-[17px]">
                    {product.alertQuantity}
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
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
