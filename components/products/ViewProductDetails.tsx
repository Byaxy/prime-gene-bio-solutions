import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { CldImage } from "next-cloudinary";
import type { Product } from "@/components/Types";
import useInventory from "@/utils/hooks/useInventory";
import Image from "next/image";

type ViewProductDetailsProps = {
  open: boolean;
  handleClose: () => void;
  product: Product;
};

export default function ViewProductDetails({
  open,
  handleClose,
  product,
}: ViewProductDetailsProps) {
  const { data } = useInventory();
  const productInventory = data?.success?.filter(
    (obj) => obj.product === product.name
  );
  const quantity = productInventory?.reduce(
    (qty: number, obj: { quantity: number }) => qty + obj.quantity,
    0
  );

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
          <div className="flex flex-col gap-10">
            {product.image ? (
              <CldImage
                className="rounded"
                src={product.image}
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
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Name
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Code
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.code}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Category
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.category ? product.category : "Null"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Brand
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.brand}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Type
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.type}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Unit
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.unit}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Quantity
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {quantity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Alert Quantity
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.alertQuantity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Description
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.description}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Created on
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {new Date(product.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Last updated on
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {new Date(product.updatedAt).toDateString()}
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
