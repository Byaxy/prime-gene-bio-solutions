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
  recieptNumber: string;
  expenseTitle: string;
  description: string;
  amount: string;
  createdBy: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const allExpensesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "110px",
    },
    {
      name: "Reciept No.",
      selector: (row: { recieptNumber: string }) => row.recieptNumber,
      width: "160px",
    },
    {
      name: "Expense Title",
      selector: (row: { expenseTitle: string }) => row.expenseTitle,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Amount",
      selector: (row: { amount: string }) => row.amount,
      width: "90px",
    },
    {
      name: "Created By",
      selector: (row: { createdBy: string }) => row.createdBy,
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
      id: 1,
      date: "15/06/2023",
      recieptNumber: "PO2023/06/001",
      expenseTitle: "MICROPROFIT",
      description: "",
      amount: "$12000",
      createdBy: "Jone Doe",
    },
    {
      id: 2,
      date: "15/06/2023",
      recieptNumber: "PO2023/06/001",
      expenseTitle: "MICROPROFIT",
      description: "",
      amount: "$12000",
      createdBy: "Jone Doe",
    },
    {
      id: 3,
      date: "15/06/2023",
      recieptNumber: "PO2023/06/001",
      expenseTitle: "Biorex Diagnostics Ltd",
      description: "",
      amount: "$11400",
      createdBy: "Jone Doe",
    },
    {
      id: 4,
      date: "15/06/2023",
      recieptNumber: "PO2023/06/001",
      expenseTitle: "HEMOCUE AB",
      description: "",
      amount: "$12450",
      createdBy: "Jone Doe",
    },
    {
      id: 5,
      date: "15/06/2023",
      recieptNumber: "PO2023/06/001",
      expenseTitle: "HEMOCUE AB",
      description: "",
      amount: "$56000",
      createdBy: "Jone Doe",
    },
  ],
};
