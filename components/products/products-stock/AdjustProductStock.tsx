import React, { ReactNode, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ProductStock, Product } from "@/components/Types";
import Image from "next/image";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { allProductsData } from "@/data/allProductsData";

type FormInput = Omit<ProductStock, "isActive">;
type ProductType = Omit<
  Product,
  | "gallery"
  | "brand"
  | "image"
  | "category"
  | "type"
  | "unit"
  | "cost"
  | "price"
  | "description"
  | "alertQuantity"
  | "isActive"
  | "updatedAt"
  | "createdAt"
>;

const defaultValues: FormInput = {
  id: "",
  name: "",
  lotNumber: "",
  manufactureDate: new Date(),
  expiryDate: new Date(),
  quantity: 0,
  reference: "",
  description: "",
  attachment: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

type AdjustProductStockProps = {
  open: boolean;
  handleClose: () => void;
};

const typeOptions = [
  {
    label: "Add",
    value: "Add",
  },
  {
    label: "Subtract",
    value: "Subtract",
  },
];
const products = allProductsData.data;

export default function AdjustProductStock({
  open,
  handleClose,
}: AdjustProductStockProps) {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(dayjs());
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(dayjs());

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const onSubmit = async (data: FormInput) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // Filter products
  useEffect(() => {
    let searchedProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(searchedProducts);
  }, [searchTerm]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setPreviewImage(null);
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Adjust Product Stock
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            <p>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </p>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="expenseDate">
                    <span className="text-primaryDark font-semibold">Date</span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <DatePicker
                    defaultValue={dayjs()}
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    disableFuture={true}
                    minDate={dayjs("01-01-2000")}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Purchase Order Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="reference"
                    type="text"
                    label="Purchase Order Number"
                    {...register("reference", {
                      required: "Purchase Order Number is required",
                    })}
                    error={!!errors.reference}
                    helperText={errors.reference?.message}
                  />
                </div>
              </div>
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">
                  Attachment
                </span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div>
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={80}
                      height={80}
                    />
                  )}
                </div>
                <TextField
                  id="attachment"
                  type="file"
                  variant="outlined"
                  {...register("attachment")}
                  onChange={handleImageChange}
                  inputProps={{ accept: "image/*", multiple: false }}
                />
              </div>
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Select a Product to Adjust its Stock
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by Name or Code"
                className="w-full"
              />
              {searchTerm && (
                <div className="max-w-[600px] max-h-[400px] overflow-y-scroll shadow-xl rounded-lg px-4">
                  <Table className="w-full">
                    <TableHead>
                      <TableRow className="bg-primaryColor">
                        <TableCell className="text-white font-bold">
                          Code
                        </TableCell>
                        <TableCell className="text-white font-bold">
                          Name
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow
                          key={product.id}
                          className="cursor-pointer hover:bg-grayColor"
                          onClick={() => (
                            setSelectedProducts([product, ...selectedProducts]),
                            setSearchTerm("")
                          )}
                        >
                          <TableCell>{product.code}</TableCell>
                          <TableCell>{product.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">Products</span>
                <span className="text-redColor"> *</span>
              </label>
              {selectedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 shadow-lg rounded-lg p-4"
                >
                  <p className="text-primaryDark font-bold">
                    Product {index + 1}
                  </p>
                  <div className="flex gap-5 w-full">
                    <div className="flex flex-col flex-[2] gap-2">
                      <label
                        htmlFor="name"
                        className="text-primaryDark font-semibold"
                      >
                        Name
                      </label>
                      <TextField
                        id="name"
                        label="Name"
                        value={product.name}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                      <label
                        htmlFor="code"
                        className="text-primaryDark font-semibold"
                      >
                        Code
                      </label>
                      <TextField
                        id="code"
                        label="Code"
                        value={product.code}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                      <label
                        htmlFor="id"
                        className="text-primaryDark font-semibold"
                      >
                        ID
                      </label>
                      <TextField
                        id="id"
                        label="ID"
                        value={product.id}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 w-full">
                    <div className="flex flex-col flex-1 gap-2">
                      <label htmlFor="role">
                        <span className="text-primaryDark font-semibold">
                          Type
                        </span>
                        <span className="text-redColor"> *</span>
                      </label>
                      <FormInputDropdown
                        id="type"
                        name="type"
                        control={control}
                        label="Type"
                        options={typeOptions}
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="description">
                        <span className="text-primaryDark font-semibold">
                          Quantity
                        </span>
                        <span className="text-redColor"> *</span>
                      </label>
                      <TextField
                        id="quantity"
                        label="Quantity"
                        type="number"
                        {...register("quantity", {
                          required: true,
                          valueAsNumber: true,
                          validate: (value) => value > 0,
                        })}
                        error={!!errors.quantity}
                        helperText={
                          errors.quantity
                            ? "Quantity is required and cannot be Zero"
                            : ""
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="expenseDate">
                        <span className="text-primaryDark font-semibold">
                          Manufacture Date
                        </span>
                        <span className="text-redColor"> *</span>
                      </label>
                      <DatePicker
                        defaultValue={dayjs()}
                        value={manufactureDate}
                        onChange={(newDate) => setManufactureDate(newDate)}
                        format="LL"
                        label="MM-DD-YYYY"
                        disableFuture={true}
                        minDate={dayjs("01-01-2000")}
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="expenseDate">
                        <span className="text-primaryDark font-semibold">
                          Expiry Date
                        </span>
                        <span className="text-redColor"> *</span>
                      </label>
                      <DatePicker
                        defaultValue={dayjs()}
                        value={expiryDate}
                        onChange={(newDate) => setExpiryDate(newDate)}
                        format="LL"
                        label="MM-DD-YYYY"
                        disableFuture={true}
                        minDate={dayjs("01-01-2000")}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">Note</span>
              </label>
              <TextField
                id="description"
                label="Note"
                multiline
                rows={4}
                {...register("description")}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (reset(), setPreviewImage(null))}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            className="font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
