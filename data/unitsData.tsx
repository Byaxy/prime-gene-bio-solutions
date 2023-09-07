import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Unit } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: Unit) => any;
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
    when: (row: Unit) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};
export type DataCells = {
  id: string;
  date: string;
  code: string;
  name: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: Unit[];
};

export const unitsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
      width: "180px",
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link
          href={`/settings/products-units/edit-unit/${row.id}`}
          key={row.id}
        >
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/settings/products-units">
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
      code: "Vol/Pk",
      name: "Volume/Pack",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      createdAt: new Date(),
      code: "Pcs/Pk",
      name: "Pieces/Pack",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "3",
      createdAt: new Date(),
      code: "Pks",
      name: "Packs",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "4",
      createdAt: new Date(),
      code: "Rolls",
      name: "Rolls",
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
