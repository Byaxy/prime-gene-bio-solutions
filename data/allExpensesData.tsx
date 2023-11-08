import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Expense } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: Expense) => any;
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
    when: (row: Expense) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: Expense[];
};

export const allExpensesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: Date }) => row.date.toDateString(),
      width: "160px",
    },
    {
      name: "Reciept No.",
      selector: (row: { reference: string }) => row.reference,
      width: "160px",
    },
    {
      name: "Expense Title",
      selector: (row: { title: string }) => row.title,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Amount",
      selector: (row: { amount: number }) => row.amount,
      width: "90px",
    },
    {
      name: "Actions",
      cell: (row: { id: number }) => [
        <Link href={`/expenses/edit-expense/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/expenses">
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
      date: new Date(),
      reference: "PO2023/06/001",
      title: "MICROPROFIT",
      description: "refund",
      amount: 12000,
      createdAt: new Date(),
      category: "Health",
      image: "",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      date: new Date("2023-06-15"),
      reference: "PO2023/06/002",
      title: "MICROPROFIT",
      description: "refund",
      amount: 13000,
      createdAt: new Date(),
      category: "Health",
      image: "",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "3",
      date: new Date("2023-06-15"),
      reference: "PO2023/06/002",
      title: "HEMOCUE AB",
      description: "refund",
      amount: 11400,
      createdAt: new Date(),
      category: "Health",
      image: "",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "4",
      date: new Date("2023-06-15"),
      reference: "PO2023/06/002",
      title: "Biorex Diagnostics Ltd",
      description: "",
      amount: 12450,
      createdAt: new Date(),
      category: "Health",
      image: "",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "5",
      date: new Date("2023-06-15"),
      reference: "PO2023/06/005",
      title: "HEMOCUE AB",
      description: "refund",
      amount: 56000,
      createdAt: new Date(),
      category: "Health",
      image: "",
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
