import { ExpenseCategory } from "@/components/Types";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type DataCells = Omit<ExpenseCategory, "isActive" | "updatedAt">;
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
    alignItems?: string;
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

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const expenseCategoriesData: DataType = {
  columns: [
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },

    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link
          href={`/settings/products-types/edit-type/${row.id}`}
          key={row.id}
        >
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/settings/products-types">
          <DeleteIcon color="error" />
        </Link>,
      ],
      width: "120px",
      style: {
        display: "flex",
        justifyContent: "center",
        gap: "5px",
      },
    },
  ],
  data: [
    {
      id: "1",
      description: "Salary",
      name: "Salary",
      code: "SL",
      createdAt: new Date(),
    },
    {
      id: "2",
      description: "Rent",
      name: "Office Rent",
      code: "Rent",
      createdAt: new Date(),
    },
    {
      id: "3",
      description: "Office maintenance",
      name: "Office",
      code: "Office",
      createdAt: new Date(),
    },
  ],
};
