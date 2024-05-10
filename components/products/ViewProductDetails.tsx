import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { CldImage } from "next-cloudinary";
import type { Product } from "@/components/Types";

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
  const quantity = product.stock?.reduce(
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
            <CldImage
              alt="Product Image"
              src={product.image}
              height={200}
              width={300}
              className="rounded-lg"
            />
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Date of Registration
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {new Date(product.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
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
                    {product.category}
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
                    Cost
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.cost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Price
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {product.price}
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
                    Last Updated
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {new Date(product.updatedAt).toDateString()}
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
