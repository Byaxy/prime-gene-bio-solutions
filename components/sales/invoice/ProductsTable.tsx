import React from "react";
import DataTable from "react-data-table-component";
import { invoiceTableStyles } from "@/styles/InvoiceTableStyles";
import type { SaleProduct } from "@/components/Types";

type ProductsTableProps = {
  products?: SaleProduct[];
};

const columns = [
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Quantity",
    cell: (row: { quantity: number; unit: string }) => (
      <span>
        {row.quantity}
        {row.unit}{" "}
      </span>
    ),
    width: "100px",
  },
  {
    name: "Unit Price",
    cell: (row: { price: number }) => <span>${row.price}</span>,
    width: "100px",
  },
  {
    name: "Sub Total",
    cell: (row: { subTotal: number }) => <span>${row.subTotal}</span>,
    width: "100px",
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
