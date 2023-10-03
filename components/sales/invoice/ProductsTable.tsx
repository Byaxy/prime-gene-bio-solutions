import React from "react";
import DataTable from "react-data-table-component";
import { invoiceTableStyles } from "@/styles/InvoiceTableStyles";
import type { InvoiceProduct } from "@/components/Types";

type ProductsTableProps = {
  products?: InvoiceProduct[];
};

const columns = [
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Description",
    selector: (row: { description: string }) => row.description,
  },
  {
    name: "Quantity",
    selector: (row: { quantity: number }) => row.quantity,
  },
  {
    name: "Unit Price",
    selector: (row: { price: number }) => row.price,
  },
  {
    name: "Sub Total",
    selector: (row: { subTotal: number }) => row.subTotal,
  },
];

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="w-full px-5 mt-4">
      <DataTable
        columns={columns}
        data={products ?? []}
        customStyles={invoiceTableStyles}
        dense
      />
    </div>
  );
}
