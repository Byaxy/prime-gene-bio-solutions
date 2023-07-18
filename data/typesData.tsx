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
  description: string;
  name: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const typesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "180px",
    },
    {
      name: "Type Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Type Description",
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
      date: "15/06/2023",
      description: "Analyzers",
      name: "Analyzers",
    },
    {
      id: "2",
      date: "16/05/2023",
      description: "Equipment",
      name: "Equipment",
    },
    {
      id: "3",
      date: "14/05/2023",
      description: "Instruments",
      name: "Instruments",
    },
    {
      id: "4",
      date: "10/02/2023",
      description: "Reagents",
      name: "Reagents",
    },
    {
      id: "5",
      date: "12/04/2023",
      description: "Kits",
      name: "Kits",
    },
  ],
};
