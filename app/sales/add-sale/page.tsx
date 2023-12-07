"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import type { Sale, Stock } from "@/components/Types";
import type { Product } from "@/components/Types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { customersData } from "@/data/customersData";
import { allProductsData } from "@/data/allProductsData";
import { styled } from "@mui/material/styles";

type FormInput = Omit<Sale<Product>, "id" | "updatedAt" | "isActive">;
type Options = {
  label: string;
  value: string;
};

const customers: Options[] = customersData.data.map((customer) => ({
  label: customer.name,
  value: customer.name,
}));

const saleStatus: Options[] = [
  {
    label: "Complete",
    value: "complete",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

const paymentStatus: Options[] = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Due",
    value: "due",
  },
  {
    label: "Partial",
    value: "partial",
  },
  {
    label: "Paid",
    value: "paid",
  },
];

const defaultValues: FormInput = {
  invoiceNumber: "",
  purchaseOrderNumber: "",
  customer: "",
  tax: 16,
  subTotal: 0,
  total: 0,
  paid: 0,
  paymentStatus: "",
  saleStatus: "",
  products: [],
  notes: "",
  createdAt: new Date(),
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#e5e7eb",
  },
}));

export default function AddSalePage() {
  const [saleDate, setSaleDate] = useState<Dayjs | null>(dayjs());
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductsList, setShowProductsList] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    ...allProductsData.data,
  ]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    control,
    watch,
    getValues,
    setValue,
  } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting, isSubmitted } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const watchFieldArray = watch("products");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      // Watch quantity field for changes so as to update the sub-total
      stock: watchFieldArray[index].stock,
      productQuantity: watchFieldArray[index].productQuantity
    };
  });

  useEffect(() => {
    if (searchTerm) {
      setShowProductsList(true);
    }
    let searchedProducts = allProductsData.data.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setProducts(searchedProducts);
  }, [products, searchTerm]);

  const handleAddProduct = (product: Product) => {
    append({ ...product });
    const subTotal = getValues("subTotal") + product.price;
    setValue("subTotal", subTotal);
    setValue("total", getTotal(subTotal, getValues("tax")));
    setSearchTerm("");
    setShowProductsList(false);
  };

  const handleDeleteProduct = (index: number) => () => remove(index);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subTotal = getValues("products").reduce(
      (accum, curr) => accum + curr.price * curr.productQuantity,
      0
    );
    setValue("subTotal", subTotal);
    // Add tax to subTotal. Current assumption is tax is
    setValue("total", getTotal(subTotal, getValues("tax")));
  };

  const handleLotNumberChange = (e: SelectChangeEvent<Stock[]>, child: ReactNode) => {
    // Get products from react-hook-form
    const currentValues: Stock[] = getValues(e.target.name) as Stock[];
    // Demote the previously selected lot number and mark currently active one
    const updatedValues = currentValues.map(({ selected, ...rest }) => {
      if (rest.lotNumber === e.target.value) return { ...rest, selected: true };
      return rest;
    });
    setValue(e.target.name, updatedValues);
  }

  const getTotal = (subTotal: number, tax: number): number =>
    (subTotal * tax) / 100 + subTotal;

  const onSubmit = async (data: FormInput) => {
    try {
      const newData = { ...data };
      console.log(newData);
    } catch (error) {
      console.error(error);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);

  const columns = [
    "Name",
    "Lot No.",
    "Available Quantity",
    "Unit Price",
    "Quantity",
    "Sub Total",
    "Actions",
  ];

  return (
    <div className="bg-white w-full rounded-lg shadow-md px-5 pt-5 pb-8">
      <div className="flex items-center justify-between w-full gap-5">
        <Typography
          variant="h3"
          sx={{
            color: "#232a58",
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          Add Sale
        </Typography>
        <Button
          onClick={router.back}
          variant="outlined"
          className="flex flex-row items-center justify-center gap-1"
        >
          <ArrowBackIcon />
          <span className="text-primaryDark font-medium capitalize sm:text-lg">
            Back
          </span>
        </Button>
      </div>
      <div className="h-[2px] bg-mainColor w-full mt-5 mb-10 sm:mb-16 opacity-20" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">Date</span>
                <span className="text-redColor"> *</span>
              </label>
              <DatePicker
                defaultValue={dayjs()}
                value={saleDate}
                onChange={(newDate) => setSaleDate(newDate)}
                format="LL"
                label="MM-DD-YYYY"
                disableFuture={true}
                minDate={dayjs("01-01-2000")}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="invoiceNumber">
                <span className="text-primaryDark font-semibold">
                  Invoice Number
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="invoiceNumber"
                type="text"
                label="Invoice Number"
                variant="outlined"
                {...register("invoiceNumber", {
                  required: "Invoice Number is required",
                })}
                error={!!errors.invoiceNumber}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">Customer</span>
              </label>
              <FormInputDropdown
                id="customer"
                name="customer"
                control={control}
                label="Select Customer"
                options={customers}
              />
            </div>
          </div>
          <div>
            <label htmlFor="products">
              <span className="text-primaryDark font-semibold">Products</span>
              <span className="text-redColor"> *</span>
            </label>
            <TextField
              id="products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by Name or Code"
              className="w-full"
            />
            {showProductsList && (
              <div className="relative  w-full md:w-1/3 text-primaryDark ">
                <div className="absolute top-0 left-0 overflow-y-scroll max-h-[40vh] bg-grayColor shadow-md rounded-b-md w-full z-50">
                  <ul className="w-full list-none p-0">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => handleAddProduct(product)}
                        className="cursor-pointer text-primaryDark p-4 rounded-md hover:bg-white"
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Table>
            <TableHead>
              <TableRow className="bg-primaryColor">
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    className="text-white font-semibold text-lg"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {controlledFields.length > 0 ? (
                <>
                  {controlledFields.map((field, index) => (
                    <StyledTableRow key={field.id}>
                      <TableCell className="text-lg">
                        <span>{field.code}</span> - <span>{field.name}</span>
                      </TableCell>
                      <TableCell className="text-lg">
                        <Controller control={control} name={`products.${index}.stock`}
                          rules={{ validate: (value, formValues) => value.filter(el => el.selected).length === 1 }}
                          render={({ field: { onBlur, value, ref } }) => (
                            <Select
                            size="small" 
                            label="Lot No."
                            name={`products.${index}.stock`}
                            onChange={handleLotNumberChange}
                            error={isSubmitted && field.stock.filter(el => el.selected).length !== 1}
                            >
                              {field.stock.map((item, idx) => (
                                <MenuItem
                                  key={`products.${index}.stock.${idx}`}
                                  value={item.lotNumber}
                                >
                                  {item.lotNumber}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-lg">
                        <p>{(field.stock.filter(el => el.selected).length && field.stock.filter(el => el.selected)[0].quantity) || "-"}</p>
                      </TableCell>
                      <TableCell className="text-lg">
                        <p>{field.price}</p>
                      </TableCell>
                      <TableCell className="text-lg">
                        <TextField
                          type="number"
                          size="small"
                          className="max-w-[80px]"
                          inputProps={{ min: 1 }}
                          defaultValue={1}
                          {...register(`products.${index}.productQuantity`, {
                            required: true,
                            min: 1,
                            valueAsNumber: true,
                            onChange: handleQuantityChange,
                          })}
                          error={
                            errors.products &&
                            !!errors.products[index]?.productQuantity
                          }
                        />
                      </TableCell>
                      <TableCell className="text-lg">
                        <p>
                          {field.price * Math.max(1, field.productQuantity)}
                        </p>
                      </TableCell>
                      <TableCell className="text-lg">
                        <Button
                          onClick={handleDeleteProduct(index)}
                          className="bg-redColor/95 text-white hover:!bg-redColor"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </>
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

          <div className="w-full flex justify-end break-inside-avoid">
            <div className="w-[300px]">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      Total
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      ${getValues("subTotal")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      Tax
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      {getValues("tax")}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      Grand Total
                    </TableCell>
                    <TableCell className="text-primaryDark font-bold text-lg">
                      ${getValues("total")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="purchaseOrderNumber">
                <span className="text-primaryDark font-semibold">
                  Purchase Order No
                </span>
              </label>
              <TextField
                id="purchaseOrderNumber"
                type="text"
                label="Purchase Order Number"
                variant="outlined"
                {...register("purchaseOrderNumber")}
                error={!!errors.purchaseOrderNumber}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">
                  Payment Status
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <FormInputDropdown
                id="paymentStatus"
                name="paymentStatus"
                control={control}
                label="Select Payment Status"
                options={paymentStatus}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label>
                <span className="text-primaryDark font-semibold">
                  Sale Status
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <FormInputDropdown
                id="saleStatus"
                name="saleStatus"
                control={control}
                label="Select Sale Status"
                options={saleStatus}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:w-1/3">
            <label htmlFor="paid">
              <span className="text-primaryDark font-semibold">
                Amount Paid
              </span>
              <span className="text-redColor"> *</span>
            </label>
            <TextField
              id="paid"
              type="number"
              label="Amount Paid"
              variant="outlined"
              {...register("paid", { required: "Amount Paid is required" })}
              error={!!errors.paid}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="notes">
              <span className="text-primaryDark font-semibold">Notes</span>
              <span className="text-redColor"> *</span>
            </label>
            <TextField
              id="notes"
              label="Notes"
              multiline
              rows={6}
              {...register("notes", { required: "Notes is required" })}
              error={!!errors.notes}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              size="large"
              className="font-bold bg-redColor/95 hover:bg-redColor"
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              className="font-bold"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
