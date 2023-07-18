import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

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
  image: string;
  code: string;
  name: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const brandsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "180px",
    },
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "100px",
      cell: (row: { image: string }) => (
        <Image
          className="rounded-full"
          src={row.image}
          alt="Product Image"
          height={40}
          width={40}
        />
      ),
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      name: "Brand Code",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Brand Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link
          href={`/settings/products-brands/edit-brand/${row.id}`}
          key={row.id}
        >
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/settings/products-brands">
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
      image: "/biorex.jpg",
      code: "BK",
      name: "BIOREX UK",
    },
    {
      id: "2",
      date: "16/05/2023",
      image: "/citotest.png",
      code: "CITOTEST",
      name: "Citotest Scientific Co Ltd",
    },
    {
      id: "3",
      date: "14/05/2023",
      image: "/dlab.png",
      code: "DLAB",
      name: "DLAB",
    },
    {
      id: "4",
      date: "10/02/2023",
      image: "/tulip.png",
      code: "Tulip 011",
      name: "Tulip Diagnostics",
    },
    {
      id: "5",
      date: "12/04/2023",
      image: "/hemocue.png",
      code: "HEMOCUE",
      name: "HEMOCUE AB",
    },
  ],
};
