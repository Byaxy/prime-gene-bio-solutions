import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import type { Brand } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: Brand) => any;
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
    padding?: string;
  };
  conditionalCellStyles?: {
    when: (row: Brand) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};
export type DataType = {
  columns: HeaderCells[];
  data: Brand[];
};

export const brandsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
    },
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "120px",
      cell: (row: { image: string }) => (
        <Image
          className="rounded-full"
          src={row.image}
          alt="Product Image"
          height={60}
          width={60}
        />
      ),
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px",
      },
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
      createdAt: new Date(),
      image: "/biorex.jpg",
      code: "BK",
      name: "BIOREX UK",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      createdAt: new Date(),
      image: "/citotest.png",
      code: "CITOTEST",
      name: "Citotest Scientific Co Ltd",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "3",
      createdAt: new Date(),
      image: "/dlab.png",
      code: "DLAB",
      name: "DLAB",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "4",
      createdAt: new Date(),
      image: "/tulip.png",
      code: "Tulip 011",
      name: "Tulip Diagnostics",
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "5",
      createdAt: new Date(),
      image: "/hemocue.png",
      code: "HEMOCUE",
      name: "HEMOCUE AB",
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
