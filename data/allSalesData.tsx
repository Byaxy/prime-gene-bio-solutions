import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Sale } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: Sale) => any;
  width?: string;
  cell?: any;
  style?: {
    display?: string;
    justifyContent?: string;
    gap?: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
  };
  conditionalCellStyles?: {
    when: (row: Sale) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};
export type DataCells = {
  id: string;
  date: Date;
  invoiceNumber: string;
  customer: string;
  total: number;
  paid: number;
  paymentStatus: string;
  saleStatus: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: Sale[];
};

export const allSalesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
      width: "110px",
    },
    {
      name: "Invoice No.",
      selector: (row: { invoiceNumber: string }) => row.invoiceNumber,
      width: "160px",
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
    },
    {
      name: "Sale Status",
      selector: (row: { saleStatus: string }) => row.saleStatus,
      width: "120px",
      conditionalCellStyles: [
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Completed",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Cancelled",
          style: {
            color: "#dc4545",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Paid",
      selector: (row: { paid: number }) => row.paid,
      width: "90px",
    },
    {
      name: "Total",
      selector: (row: { total: number }) => row.total,
      width: "90px",
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: string }) => row.paymentStatus,
      width: "150px",
      conditionalCellStyles: [
        {
          when: (row: { paymentStatus: string }) =>
            row.paymentStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { paymentStatus: string }) =>
            row.paymentStatus === "Paid",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/sales/edit-sale/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/sales">
          <DeleteIcon color="error" />
        </Link>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
        gap: "4px",
      },
    },
  ],
  data: [
    {
      id: "1",
      invoiceNumber: "Inv.2023/06/001",
      customer: "UROCARE LIBERIA",
      total: 12000,
      paid: 12000,
      paymentStatus: "Paid",
      saleStatus: "Completed",
      createdAt: new Date(),
      tax: 0,
      purchaseOrderNumber: "PO2023/06/001",
      subTotal: 12000,
      products: [
        {
          name: "Talley Counter",
          description: "Talley Counter description",
          quantity: 1,
          price: 200,
          subTotal: 200,
        },
        {
          name: "Sealent",
          description: "Sealent tube description",
          quantity: 2,
          price: 50.5,
          subTotal: 110,
        },
        {
          name: "Talley Counter",
          description: "Talley Counter description",
          quantity: 1,
          price: 200,
          subTotal: 200,
        },
        {
          name: "Sealent",
          description: "Sealent tube description",
          quantity: 2,
          price: 50.5,
          subTotal: 110,
        },
        {
          name: "Talley Counter",
          description: "Talley Counter description",
          quantity: 1,
          price: 200,
          subTotal: 200,
        },
      ],
      notes: "",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      invoiceNumber: "Inv.2023/06/001",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      total: 12000,
      paid: 2000,
      paymentStatus: "Pending",
      saleStatus: "Completed",
      createdAt: new Date(),
      tax: 0,
      purchaseOrderNumber: "PO2023/06/001",
      subTotal: 12000,
      products: [
        {
          name: "Sealent",
          description: "Sealent tube description",
          quantity: 2,
          price: 50.5,
          subTotal: 110,
        },
        {
          name: "Talley Counter",
          description: "Talley Counter description",
          quantity: 1,
          price: 200,
          subTotal: 200,
        },
        {
          name: "Talley Counter",
          description: "Talley Counter description",
          quantity: 1,
          price: 200,
          subTotal: 200,
        },
      ],

      notes: "",
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
