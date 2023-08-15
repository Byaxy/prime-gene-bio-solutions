import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type HeaderCells = {
  name: string;
  selector?: (row: DataCells) => any;
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
  invoiceNumber: string;
  customer: string;
  total: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const returnsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
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
      name: "Total",
      selector: (row: { total: string }) => row.total,
      width: "90px",
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
      id: 1,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "PARTNERS IN HEALTH",
      total: "$12000",
    },
    {
      id: 2,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      total: "$12000",
    },
  ],
};
