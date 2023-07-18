import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataCells } from "./categoriesData";

export type Column = {
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
};

export const columns: Column[] = [
  {
    name: "Date",
    selector: (row: { date: string }) => row.date,
    width: "180px",
  },
  {
    name: "Sub Category Code",
    selector: (row: { code: string }) => row.code,
    width: "180px",
  },
  {
    name: "Sub Category Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Sub Category Description",
    selector: (row: { description: string }) => row.description,
  },
  {
    name: "Subcategories",
    cell: (row: { subCategories: DataCells[] }) => (
      <ul className="list-none">
        {row.subCategories &&
          row.subCategories.map((subcategory) => (
            <li key={subcategory.name}>{subcategory.name}</li>
          ))}
      </ul>
    ),
  },
  {
    name: "Actions",
    cell: (row: { id: string }) => [
      <Link
        href={`/settings/products-categories/edit-category/${row.id}`}
        key={row.id}
      >
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/settings/products-categories">
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
];
