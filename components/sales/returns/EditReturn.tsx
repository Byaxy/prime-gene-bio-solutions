import React, { useCallback, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  MenuItem,
  Select,
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import type {
  Delivery,
  DeliveryProduct,
  ReturnProduct,
  SaleReturn,
} from "@/components/Types";
import axios from "axios";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import { customTableStyles } from "@/styles/TableStyles";
import toast from "react-hot-toast";

// TO DO - update typee to Return type
type FormInput = Omit<SaleReturn, "id" | "createdAt" | "isActive">;

type EditReturnProps = {
  open: boolean;
  handleClose: () => void;
  saleReturn: SaleReturn;
};

const dialogColumns = [
  "Lot Number",
  "Product Name",
  "Qty Supplied",
  "Qnty Returned",
  "Sub Total",
];

const EditReturn = ({ open, handleClose, saleReturn }: EditReturnProps) => {
  const defaultValues: FormInput = {
    date: saleReturn.date,
    saleInvoiceNumber: saleReturn.saleInvoiceNumber,
    deliveryReferenceNumber: saleReturn.deliveryReferenceNumber,
    description: saleReturn.description,
    customer: saleReturn.customer,
    products: saleReturn.products,
    total: saleReturn.total,
    updatedAt: new Date(),
  };

  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const [returnDate, setReturnDate] = useState<Dayjs | null>(
    dayjs(saleReturn.date)
  );
  const [products, setProducts] = useState<ReturnProduct[]>(
    saleReturn.products
  );
  const [selectedProduct, setSelectedProduct] = useState<ReturnProduct>(
    {} as ReturnProduct
  );
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState<number>(
    selectedProduct.quantityReturned
  );
  const [subTotal, setSubTotal] = useState<number>(selectedProduct.subTotal);
  const [total, setTotal] = useState<number>(saleReturn.total);

  const columns = [
    {
      name: "Lot Number",
      selector: (row: { lotNumber: string }) => row.lotNumber,
      width: "120px",
    },
    {
      name: "Product Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Qnty Supplied",
      cell: (row: { quantitySupplied: number; unit: string }) => (
        <span>
          {row.quantitySupplied} {row.unit}
        </span>
      ),
      width: "140px",
    },
    {
      name: "Qnty Returned",
      cell: (row: { quantityReturned: number; unit: string }) => (
        <span>
          {row.quantityReturned} {row.unit}
        </span>
      ),
      width: "140px",
    },
    {
      name: "Sub Total",
      cell: (row: { subTotal: number }) => <span>${row.subTotal}</span>,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row: ReturnProduct) => [
        <span
          onClick={() => handleOpenModal(row)}
          key={"edit" + row.id}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  // reset form
  const handleCancel = useCallback(() => {
    reset();
    setProducts(saleReturn.products);
  }, [reset, saleReturn.products]);

  // calculate total
  useEffect(() => {
    let total = products?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.subTotal,
      0
    );
    setTotal(total);
  }, [products, saleReturn.products]);

  // open model
  const handleOpenModal = (product: ReturnProduct) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  // close model
  const handleCloseModal = () => {
    setSelectedProduct({} as ReturnProduct);
    setOpenModal(false);
  };

  // add product to list of delivered products
  const handleAddProduct = (product: ReturnProduct) => {
    // remove selected product from list.
    let remainingProducts = products.filter(
      (item) => item.id !== product.id && item.lotNumber !== product.lotNumber
    );
    // updated products list
    let updatedProducts = [
      {
        ...product,
        quantityReturned: quantity,
        subTotal: subTotal,
      },
      ...remainingProducts,
    ];
    setProducts(updatedProducts);
    setQuantity(0);
    toast.success("Return added successfully");
    handleCloseModal();
  };

  useEffect(() => {
    if (saleReturn) {
      setProducts(saleReturn.products);
    }
  }, [saleReturn]);

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = {
        ...data,
        total,
        products,
      };
      const response = await axios.patch(
        `http://localhost:5000/sales-returns/${saleReturn.id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("Return Edited successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      handleCancel();
      handleClose();
    }
  }, [handleCancel, handleClose, isSubmitSuccessful]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Return
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="deliveryDate">
                    <span className="text-primaryDark font-semibold">
                      Delivery Date
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <DatePicker
                    defaultValue={dayjs()}
                    value={returnDate}
                    onChange={(newDate) => setReturnDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    minDate={dayjs("01-01-2000")}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Delivery Reference Number
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="reference"
                    type="text"
                    label="Delivery Reference Number"
                    variant="outlined"
                    value={saleReturn.deliveryReferenceNumber}
                    disabled
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="customer">
                    <span className="text-primaryDark font-semibold">
                      Customer
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="customer"
                    type="text"
                    label="Customer"
                    variant="outlined"
                    value={saleReturn.customer}
                    disabled
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Invoice Number
                    </span>
                  </label>
                  <TextField
                    id="customer"
                    type="text"
                    label="Customer"
                    variant="outlined"
                    value={saleReturn.saleInvoiceNumber}
                    disabled
                  />
                </div>
              </div>
              {/** Select product */}
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="products">
                  <span className="text-primaryDark font-semibold">
                    Products
                  </span>
                  <span className="text-redColor"> *</span>
                </label>
                {/** List of products delivered */}
                <DataTable
                  columns={columns}
                  data={products}
                  customStyles={customTableStyles}
                  noDataComponent={
                    <div className="w-full text-center text-primaryDark font-semibold">
                      No Products To Display
                    </div>
                  }
                />
              </div>
              <div className="flex flex-row items-center justify-end gap-14 px-5 py-6">
                <span className="text-primaryDark font-bold text-xl">
                  Total Returned:
                </span>
                <span className="text-primaryDark font-bold text-xl">
                  ${total}
                </span>
              </div>

              {/** Confirm quantity supplied for each product */}
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
              >
                <DialogContent>
                  <Table size="small">
                    <TableHead>
                      <TableRow className="bg-primaryColor">
                        {dialogColumns.map((column, index) => (
                          <TableCell
                            key={column + index}
                            className="text-white font-semibold"
                          >
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProduct ? (
                        <TableRow>
                          <TableCell className="text-primaryDark font-semibold text-[17px]">
                            {selectedProduct.lotNumber}
                          </TableCell>
                          <TableCell className="text-primaryDark font-semibold text-[17px]">
                            {selectedProduct.name}
                          </TableCell>
                          <TableCell className="text-primaryDark font-semibold text-[17px]">
                            {selectedProduct.quantitySupplied}
                          </TableCell>
                          <TableCell className="text-lg text-primaryDark text-center">
                            <TextField
                              type="number"
                              size="small"
                              className="max-w-[60px]"
                              inputProps={{
                                min: 0,
                                max: selectedProduct.quantitySupplied,
                              }}
                              defaultValue={selectedProduct.quantityReturned}
                              onChange={(e) => (
                                setQuantity(parseInt(e.target.value)),
                                setSubTotal(
                                  selectedProduct.price *
                                    parseInt(e.target.value)
                                )
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-lg text-primaryDark">
                            <span>
                              {selectedProduct.price * Math.max(0, quantity)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={8}
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
                    onClick={handleCloseModal}
                    className="font-bold bg-redColor/95 hover:bg-redColor transition text-white capitalize"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleAddProduct(selectedProduct!)}
                    className="font-bold bg-primaryColor/95 hover:bg-primaryColor transition text-white capitalize"
                  >
                    Add Product
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="description">
                  <span className="text-primaryDark font-semibold">Notes</span>
                </label>
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={6}
                  defaultValue={saleReturn.description}
                  {...register("description")}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCancel}
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            disabled={isSubmitting}
            className="saveBtn"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditReturn;
