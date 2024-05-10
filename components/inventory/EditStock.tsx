import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import type { Product, ProductWithStock, Stock } from "../Types";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

type FormInput = Omit<Stock, "id" | "createdAt">;

type EditStockProps = {
  open: boolean;
  handleClose: () => void;
  stock: ProductWithStock;
};

const columns = [
  "Name",
  "Lot No.",
  "Adjust Type",
  "Avail. Qnty",
  "Adjust By Qnty",
  "New Qnty",
];

const EditStock = ({ open, handleClose, stock }: EditStockProps) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);
  const [adjustType, setAdjustType] = useState<string>("add");
  const [adjustQnty, setAdjustQnty] = useState<number>(0);
  const [newQnty, setNewQnty] = useState<number>(0);

  const { reset, formState } = useForm();
  const { isSubmitSuccessful, isSubmitting } = formState;

  // Submit form data
  const onSubmit = async () => {
    try {
      const updatedStock = {
        ...stock.stock,
        quantity: newQnty,
        manufactureDate,
        expiryDate,
        updatedAt: new Date(),
      };
      const stockArr = product.stock.filter(
        (item) => item.id !== stock.stock.id
      );
      const updatedStockArr = [{ ...updatedStock }, ...stockArr];
      const newData = {
        stock: updatedStockArr,
        updatedAt: new Date(),
      };
      const response = await axios.patch(
        `http://localhost:5000/products/${stock.id}`,
        newData
      );
      if (response.status === 200) {
        toast.success("Stock Updated succefully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // fetch product from which to Edit stock
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
    setManufactureDate(dayjs(stock.stock?.manufactureDate));
    setExpiryDate(dayjs(stock.stock?.expiryDate));
  }, [stock]);

  // Calculate new Quantinty depending on the adjust type.
  useEffect(() => {
    if (adjustType === "sub") {
      const qnty = stock.stock?.quantity - adjustQnty;
      setNewQnty(qnty);
    } else if (adjustType === "add") {
      const qnty = stock.stock?.quantity + adjustQnty;
      setNewQnty(qnty);
    }
  }, [adjustQnty, adjustType, stock.stock?.quantity]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setManufactureDate(null);
      setExpiryDate(null);
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Adjust Stock Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <label>
                  <span className="text-primaryDark font-semibold">
                    Manufacture Date
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                <DatePicker
                  value={manufactureDate}
                  onChange={(newDate) => setManufactureDate(newDate)}
                  format="LL"
                  label="MM-DD-YYYY"
                  disableFuture={true}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label>
                  <span className="text-primaryDark font-semibold">
                    Expiry Date
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                <DatePicker
                  value={expiryDate}
                  onChange={(newDate) => setExpiryDate(newDate)}
                  format="LL"
                  label="MM-DD-YYYY"
                />
              </div>
            </div>
            <div className="w-full">
              <Table>
                <TableHead>
                  <TableRow className="bg-primaryColor">
                    {columns.map((column, index) => (
                      <TableCell
                        key={column + index}
                        className="text-white font-semibold text-[16px]"
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="h-[5px]">
                    <TableCell className="text-primaryDark font-semibold text-lg">
                      {stock.name}
                    </TableCell>
                    <TableCell className="text-primaryDark font-semibold text-lg">
                      {stock.stock?.lotNumber}
                    </TableCell>
                    <TableCell>
                      <Select label="Adjust Type" defaultValue="add">
                        <MenuItem
                          key="add"
                          value="add"
                          onClick={() => setAdjustType("add")}
                        >
                          Add
                        </MenuItem>
                        <MenuItem
                          key="sub"
                          value="sub"
                          onClick={() => setAdjustType("sub")}
                        >
                          Sub
                        </MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell className="text-lg">
                      <TextField
                        type="number"
                        value={stock.stock?.quantity}
                        className="max-w-[80px]"
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        className="max-w-[80px]"
                        inputProps={{ min: 0 }}
                        defaultValue={0}
                        onChange={(e) =>
                          setAdjustQnty(parseInt(e.target.value))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={newQnty}
                        className="max-w-[80px]"
                        disabled
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (reset(), handleClose())}
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => (onSubmit(), handleClose())}
            size="large"
            className="saveBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditStock;
