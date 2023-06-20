import { ReactHTMLElement } from "react";

export const salesData = {
  columns: [
    {
      name: "No.",
      selector: (row: { id: number }) => row.id,
    },
    {
      name: "Date",
      selector: (row: { date: any }) => row.date,
    },
    {
      name: "Invoice No.",
      selector: (row: { invoiceNumber: any }) => row.invoiceNumber,
    },
    {
      name: "Customer",
      selector: (row: { customer: any }) => row.customer,
    },
    {
      name: "Total",
      selector: (row: { total: any }) => row.total,
    },
    {
      name: "Paid",
      selector: (row: { paid: any }) => row.paid,
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: any }) => row.paymentStatus,
    },
    {
      name: "Sale Status",
      selector: (row: { saleStatus: any }) => row.saleStatus,
    },
  ],
  data: [
    {
      id: 1,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "GIMS",
      total: "$12000",
      paid: "$2000",
      paymentStatus: "Pending",
      saleStatus: "Pending",
    },
  ],
};
