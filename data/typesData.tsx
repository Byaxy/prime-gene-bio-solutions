import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Types } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: Types) => any;
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
    when: (row: Types) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: Types[];
};

export const typesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
      width: "180px",
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
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
      createdAt: new Date(),
      description: "Analyzers",
      name: "Analyzers",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      createdAt: new Date(),
      description: "Equipment",
      name: "Equipment",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "3",
      createdAt: new Date(),
      description: "Instruments",
      name: "Instruments",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "4",
      createdAt: new Date(),
      description: "Reagents",
      name: "Reagents",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "5",
      createdAt: new Date(),
      description: "Kits",
      name: "Kits",
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
