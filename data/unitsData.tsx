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
export type DataCells = {
  id: string;
  date: string;
  code: string;
  name: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const unitsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "180px",
    },
    {
      name: "Unit Code",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Unit Name",
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
      date: "15/06/2023",
      code: "Vol/Pk",
      name: "Volume/Pack",
    },
    {
      id: "2",
      date: "16/05/2023",
      code: "Pcs/Pk",
      name: "Pieces/Pack",
    },
    {
      id: "3",
      date: "14/05/2023",
      code: "Pks",
      name: "Packs",
    },
    {
      id: "4",
      date: "10/02/2023",
      code: "Rolls",
      name: "Rolls",
    },
  ],
};
