import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Product, ProductWithStock } from "../Types";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type DeleteStockProps = {
  open: boolean;
  handleClose: () => void;
  stock: ProductWithStock;
};
const DeleteStock = ({ open, handleClose, stock }: DeleteStockProps) => {
  const [product, setProduct] = useState<Product>({} as Product);

  // delete stock from product
  const handleDelete = async () => {
    try {
      const updatedStockArr = product.stock.filter(
        (item) => item.id !== stock.stock.id
      );
      const data = { stock: updatedStockArr, updatedAt: new Date() };
      const response = await axios.patch(
        `http://localhost:5000/products/${stock.id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Stock Deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // fetch product from which to Delete stock
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${stock.id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [stock]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <span className="text-2xl text-primaryDark font-bold">
            Delete Product Stock
          </span>
        </DialogTitle>
        <DialogContent>
          <span className="text-lg text-primaryDark">
            Confirm to permanantely Delete Stock with{" "}
            <span className="font-semibold">
              Lot Number - {stock.stock?.lotNumber}
            </span>{" "}
            from product <span className="font-semibold">{stock.name}</span>
          </span>
          <br />
          <br />
          <span className="text-redColor">
            <span className="font-semibold">NOTE: </span>This action cannot be
            reversed
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={handleClose}
            size="large"
            className="saveBtn"
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              handleDelete();
              handleClose();
            }}
            className="cancelBtn"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteStock;
