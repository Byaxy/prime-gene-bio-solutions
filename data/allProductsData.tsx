import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: Product) => any;
  width?: string;
  cell?: any;
  style?: {
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
  };
  conditionalCellStyles?: {
    when: (row: Product) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: Product[];
};

export const allProductsData: DataType = {
  columns: [
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "80px",
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
      name: "Code",
      selector: (row: { code: string }) => row.code,
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Brand",
      selector: (row: { brand: string }) => row.brand,
    },
    {
      name: "Category",
      selector: (row: { category: string }) => row.category,
    },
    {
      name: "Cost ($)",
      selector: (row: { cost: number }) => row.cost,
    },
    {
      name: "Price ($)",
      selector: (row: { price: number }) => row.price,
    },
    {
      name: "Quantity",
      selector: (row: { quantity: number | null }) => row.quantity,
    },
    {
      name: "Unit",
      selector: (row: { unit: string }) => row.unit,
    },
    {
      name: "Alert Quantity",
      selector: (row: { alertQuantity: number }) => row.alertQuantity,
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/products/edit-product/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/products">
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
      createdAt: new Date(),
      image: "/product.jpg",
      code: "0085",
      name: "Talley Counter",
      brand: "Allele Diagnostic",
      type: "Sample Type",
      category: "General Lab Equipment",
      cost: 33.5,
      price: 200.0,
      quantity: 1.0,
      unit: "Pcs/Pk",
      alertQuantity: 5,
      description: "",
      gallery: [],
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      createdAt: new Date(),
      image: "/product.jpg",
      code: "00857",
      name: "Sealent",
      brand: "Allele Diagnostic",
      type: "Sample type",
      category: "General Lab Equipment",
      cost: 33.0,
      price: 50.5,
      quantity: 0,
      unit: "Pcs/Pk",
      alertQuantity: 5,
      description: "",
      gallery: [],
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
