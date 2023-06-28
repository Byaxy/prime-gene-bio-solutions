import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type HeaderCells = {
  name: string;
  selector?: (row: DataCells) => any;
  cell?: any;
  width?: string;
  style?: {
    color?: string;
    fontWeight?: string;
    fontSize?: string;
    display?: string;
    justifyContent?: string;
    gap?: string;
  };
  conditionalCellStyles?: {
    when: (row: DataCells) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};
export type DataCells = {
  id: number;
  date: string;
  purchaseOrderNumber: string;
  supplier: string;
  total: string;
  paid: string;
  balance: string;
  paymentStatus: string;
  purchaseStatus: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const allPurchasesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "110px",
    },
    {
      name: "Purchase Order No.",
      selector: (row: { purchaseOrderNumber: string }) =>
        row.purchaseOrderNumber,
      width: "160px",
    },
    {
      name: "Supplier",
      selector: (row: { supplier: string }) => row.supplier,
    },
    {
      name: "Purchase Status",
      selector: (row: { purchaseStatus: string }) => row.purchaseStatus,
      width: "140px",
      conditionalCellStyles: [
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Recieved",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Cancelled",
          style: {
            color: "#dc4545",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Total",
      selector: (row: { total: string }) => row.total,
      width: "90px",
    },
    {
      name: "Paid",
      selector: (row: { paid: string }) => row.paid,
      width: "90px",
    },
    {
      name: "Balance",
      selector: (row: { balance: string }) => row.balance,
      width: "90px",
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: string }) => row.paymentStatus,
      width: "140px",
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
      cell: (row: { id: number }) => [
        <Link href={`/purchases/edit-purchase/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/purchases">
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
      id: 1,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "MICROPROFIT",
      total: "$12000",
      paid: "$12000",
      balance: "$0",
      paymentStatus: "Paid",
      purchaseStatus: "Recieved",
    },
    {
      id: 2,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "MICROPROFIT",
      total: "$12000",
      paid: "$0",
      balance: "$12000",
      paymentStatus: "Pending",
      purchaseStatus: "Recieved",
    },
    {
      id: 3,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "Biorex Diagnostics Ltd",
      total: "$11400",
      paid: "$11400",
      balance: "$0",
      paymentStatus: "Paid",
      purchaseStatus: "Pending",
    },
    {
      id: 4,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "HEMOCUE AB",
      total: "$12450",
      paid: "$450",
      balance: "$12000",
      paymentStatus: "Pending",
      purchaseStatus: "Cancelled",
    },
    {
      id: 5,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "HEMOCUE AB",
      total: "$56000",
      paid: "$6000",
      balance: "$50000",
      paymentStatus: "Pending",
      purchaseStatus: "Pending",
    },
  ],
};
