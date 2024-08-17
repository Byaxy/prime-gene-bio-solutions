"use client";

import { useEffect, useState } from "react";
import { Button, TextField, Typography, FormLabel } from "@mui/material";

import { useForm } from "react-hook-form";
import {
  type Sale,
  type SaleProduct,
  type Product,
  Inventory,
} from "@/components/Types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import toast from "react-hot-toast";
import { paymentStatus } from "@/components/constants";
import { saleStatus } from "@/components/constants";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import useProducts from "@/utils/hooks/useProducts";
import useCustomerOptions from "@/utils/hooks/useCustomerOptions";
import SelectProduct from "@/components/sales/SelectProduct";
import ProductDetailsDialog from "@/components/sales/ProductDetailsDialog";
import useInventory from "@/utils/hooks/useInventory";
import BackButton from "@/components/BackButton";
import TotalCalculation from "@/components/TotalCalculation";
import NoDataComponent from "@/components/NoDataComponent";
import { addSale } from "@/server/actions/sales";

type FormInput = Omit<Sale, "id" | "createdAt" | "updatedAt">;
type SaleProductInput = Omit<
  SaleProduct,
  "id" | "saleID" | "createdAt" | "updatedAt"
>;

const tax: number = 0;

const defaultValues: FormInput = {
  invoiceNumber: "",
  purchaseOrderNumber: "",
  customer: "",
  taxAmount: 0,
  subTotal: 0,
  total: 0,
  amountPaid: 0,
  paymentStatus: "",
  saleStatus: "",
  products: [],
  notes: "",
};

export default function AddSalePage() {
  // fetch products and customer options
  const products = useProducts();
  const customerOptions = useCustomerOptions();
  const inventory = useInventory();

  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const [saleDate, setSaleDate] = useState<Dayjs | null>(dayjs());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductInventory, setSelectedProductInventory] = useState<
    Inventory[]
  >([]);

  const [openModal, setOpenModal] = useState(false);
  const [saleProducts, setSaleProducts] = useState<SaleProductInput[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);

  // table columns
  const columns = [
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
      width: "120px",
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Lot No.",
      selector: (row: { lotNumber: string }) => row.lotNumber,
      width: "120px",
    },
    {
      name: "Quantity",
      cell: (row: { quantity: number; unit: string }) => (
        <span>
          {row.quantity} {row.unit}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Unit Price",
      cell: (row: { price: number }) => <span>${row.price}</span>,
      width: "120px",
    },
    {
      name: "Sub Total",
      cell: (row: { subTotal: number }) => <span>${row.subTotal}</span>,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row: SaleProductInput) => (
        <Button
          variant="contained"
          size="small"
          className="bg-redColor/95 hover:bg-redColor p-1 text-white font-bold"
          onClick={() => handleDeleteProduct(row)}
        >
          Delete
        </Button>
      ),
      width: "120px",
    },
  ];

  // close product details modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };

  // add product to list of sold products
  const handleAddProduct = (product: SaleProductInput) => {
    // Check if the product is already in the list of sale products
    const existingProduct = saleProducts.find(
      (p) => p.code === product.code && p.lotNumber === product.lotNumber
    );

    if (existingProduct) {
      toast.error("Product is already on the list. Delete it to make changes");
      handleCloseModal();
      return;
    }

    // If the product is not in the list, add it
    setSaleProducts([...saleProducts, product]);
    toast.success("Product added successfully");
    handleCloseModal();
  };
  // select product
  const handleProductSelect = (product: Product) => {
    const productInventory = inventory.data?.success?.filter(
      (item: Inventory) => item.product === product.name
    );

    if (productInventory) {
      setSelectedProductInventory(productInventory);
    }
    setSelectedProduct(product);
    setOpenModal(true);
  };

  // delete product TO DO: make it more efficcient.
  const handleDeleteProduct = (product: SaleProductInput) => {
    let newSaleProducts = [...saleProducts];
    newSaleProducts.splice(newSaleProducts.indexOf(product), 1);
    setSaleProducts(newSaleProducts);

    toast.success("Product deleted successfully");
  };

  // calculate total
  const getTotal = (saleProducts: SaleProductInput[]): number =>
    saleProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.subTotal,
      0
    );

  // calculate grand total
  const getGrandTotal = (total: number, tax: number): number =>
    (total * tax) / 100 + total;

  // calculate tax amount
  const getTaxAmount = (total: number, tax: number): number =>
    (total * tax) / 100;

  // Submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      if (saleProducts.length === 0) {
        toast.error("Please add atleast one product");
        return;
      }

      // create products array
      const products = saleProducts.map((product) => ({
        saleID: "",
        productID: product.productID,
        name: product.name,
        code: product.code,
        lotNumber: product.lotNumber,
        unit: product.unit,
        quantity: product.quantity,
        price: product.price,
        subTotal: product.subTotal,
      }));

      const formData = {
        ...data,
        saleDate,
        taxAmount,
        products: [...products],
        subTotal: total,
        total: grandTotal,
      };
    } catch (error) {
      console.error("Error adding Product:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    let total = getTotal(saleProducts);
    setTotal(total);
    let taxAmount = getTaxAmount(total, tax);
    setTaxAmount(taxAmount);
    let grandTotal = getGrandTotal(total, tax);
    setGrandTotal(grandTotal);
  }, [saleProducts]);

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      setSaleProducts([]);
      setTotal(0);
      setTaxAmount(0);
      setGrandTotal(0);
      reset({}, { keepDefaultValues: true });
    }
  }, [isSubmitSuccessful, reset]);

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
        <BackButton />
      </div>
      <div className="h-[2px] bg-mainColor w-full mt-5 mb-10 sm:mb-16 opacity-20" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <FormLabel>
                <span className="text-primaryDark font-semibold">Date</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
              <FormLabel htmlFor="invoiceNumber">
                <span className="text-primaryDark font-semibold">
                  Invoice Number
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <TextField
                id="invoiceNumber"
                type="text"
                label="Invoice Number"
                variant="outlined"
                {...register("invoiceNumber", {
                  required: "Invoice Number is required",
                })}
              />
              {errors.invoiceNumber && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.invoiceNumber?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <FormLabel htmlFor="customer">
                <span className="text-primaryDark font-semibold">Customer</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <FormInputDropdown
                id="customer"
                control={control}
                label="Select Customer"
                options={customerOptions.data?.success || []}
                {...register("customer", { required: "Customer is required" })}
              />
              {errors.customer && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.customer?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            {products.data?.success && (
              <>
                <FormLabel>
                  <span className="text-primaryDark font-semibold">
                    Products
                  </span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                {/** Select Product */}
                <SelectProduct
                  products={products.data?.success || []}
                  onProductSelect={handleProductSelect}
                />
              </>
            )}

            {selectedProduct && (
              <ProductDetailsDialog
                open={openModal}
                onClose={handleCloseModal}
                selectedProduct={selectedProduct}
                onAddProduct={handleAddProduct}
                productInventory={selectedProductInventory}
              />
            )}
          </div>

          <div className="w-full py-6">
            <DataTable
              columns={columns}
              data={saleProducts}
              customStyles={customTableStyles}
              noDataComponent={
                <NoDataComponent text="No products added yet. Select a product to add to the sale." />
              }
              persistTableHead
            />
            <div className="flex w-full justify-end pt-8">
              <TotalCalculation
                tax={tax}
                taxAmount={taxAmount}
                total={total}
                grandTotal={grandTotal}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <FormLabel htmlFor="purchaseOrderNumber">
                <span className="text-primaryDark font-semibold">
                  Purchase Order No
                </span>
              </FormLabel>
              <TextField
                id="purchaseOrderNumber"
                type="text"
                label="Purchase Order Number"
                variant="outlined"
                {...register("purchaseOrderNumber")}
              />
              {errors.purchaseOrderNumber && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.purchaseOrderNumber?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <FormLabel htmlFor="paymentStatus">
                <span className="text-primaryDark font-semibold">
                  Payment Status
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <FormInputDropdown
                id="paymentStatus"
                control={control}
                label="Select Payment Status"
                options={paymentStatus}
                {...register("paymentStatus", {
                  required: "Payment Status is required",
                })}
              />
              {errors.paymentStatus && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.paymentStatus?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <FormLabel htmlFor="saleStatus">
                <span className="text-primaryDark font-semibold">
                  Sale Status
                </span>
                <span className="text-redColor"> *</span>
              </FormLabel>
              <FormInputDropdown
                id="saleStatus"
                control={control}
                label="Select Sale Status"
                options={saleStatus}
                {...register("saleStatus", {
                  required: "Sale Status is required",
                })}
              />
              {errors.saleStatus && (
                <span className="text-redColor text-sm -mt-1">
                  {errors.saleStatus?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:w-1/3">
            <FormLabel htmlFor="amountPaid">
              <span className="text-primaryDark font-semibold">
                Amount Paid
              </span>
              <span className="text-redColor"> *</span>
            </FormLabel>
            <TextField
              id="amountPaid"
              type="number"
              label="Amount Paid"
              inputProps={{ min: 0 }}
              variant="outlined"
              {...register("amountPaid", {
                required: "Amount Paid is required",
                valueAsNumber: true,
                max: {
                  value: grandTotal,
                  message: "Amount paid cannot be greater than grand total",
                },
              })}
            />
            {errors.amountPaid && (
              <span className="text-redColor text-sm -mt-1">
                {errors.amountPaid?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel htmlFor="notes">
              <span className="text-primaryDark font-semibold">Notes</span>
            </FormLabel>
            <TextField
              id="notes"
              label="Notes"
              multiline
              rows={6}
              {...register("notes")}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              size="large"
              className="cancelBtn"
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              className="saveBtn"
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
