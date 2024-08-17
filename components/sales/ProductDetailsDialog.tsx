import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Inventory, Product, SaleProduct } from "@/components/Types";
import Cancel from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";

type SaleProductInput = Omit<
  SaleProduct,
  "id" | "saleID" | "createdAt" | "updatedAt"
>;

interface ProductDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  productInventory: Inventory[];
  onAddProduct: (product: SaleProductInput) => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  open,
  onClose,
  selectedProduct,
  productInventory,
  onAddProduct,
}) => {
  const [lotNumber, setLotNumber] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(0);
  const [availableQuantity, setAvailableQuantity] = React.useState(0);

  const handleLotNumberChange = (event: SelectChangeEvent<string>) => {
    const selectedInventory = productInventory.find(
      (lot) => lot.lotNumber === event.target.value
    );
    if (selectedInventory) {
      setLotNumber(selectedInventory.lotNumber);
      setAvailableQuantity(selectedInventory.quantity);
      setPrice(selectedInventory.price);
    }
  };

  const handleAddProduct = () => {
    if (!lotNumber) {
      toast.error("Please select lot number");
      return;
    }

    if (quantity > availableQuantity) {
      toast.error("Insufficient quantity in stock");
    }

    if (selectedProduct) {
      onAddProduct({
        name: selectedProduct.name,
        code: selectedProduct.code,
        unit: selectedProduct.unit,
        quantity: quantity,
        lotNumber: lotNumber,
        price: price,
        subTotal: price * quantity,
        productID: selectedProduct.id,
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <span className="text-xl text-primaryDark font-bold">
          Add Product Details
        </span>
        <Cancel
          fontSize="medium"
          className="text-primaryDark cursor-pointer"
          onClick={onClose}
        />
      </DialogTitle>
      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow className="bg-primaryColor">
              <TableCell className="text-white font-semibold">Name</TableCell>
              <TableCell className="text-white font-semibold">
                Lot No.
              </TableCell>
              <TableCell className="text-white font-semibold">
                Available Qnty
              </TableCell>
              <TableCell className="text-white font-semibold">
                Unit Price
              </TableCell>
              <TableCell className="text-white font-semibold">
                Quantity
              </TableCell>
              <TableCell className="text-white font-semibold">
                Sub Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProduct ? (
              <TableRow>
                <TableCell className="text-primaryDark font-semibold">
                  {selectedProduct.code} - {selectedProduct.name}
                </TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={lotNumber}
                    onChange={handleLotNumberChange}
                  >
                    {productInventory.map((item) => (
                      <MenuItem key={item.lotNumber} value={item.lotNumber}>
                        {item.lotNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  {availableQuantity} {selectedProduct.unit}
                </TableCell>
                <TableCell>${price}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    className="max-w-[60px]"
                    inputProps={{ min: 1 }}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>${price * quantity}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-primaryDark"
                >
                  No Items To Display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          className="font-bold bg-redColor/95 hover:bg-redColor transition text-white capitalize"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAddProduct}
          className="font-bold bg-primaryColor/95 hover:bg-primaryColor transition text-white capitalize"
        >
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsDialog;
