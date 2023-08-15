import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Image from "next/image";

type HeaderCells = {
  name: string;
  selector?: (row: DataCells) => any;
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
  image: string;
  brand: string;
  type: string;
  category: string;
  cost: number;
  price: number;
  quantity: number | null;
  unit: string;
  alertQuantity: number;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
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
      date: "12/04/2023",
      image: "/product.jpg",
      code: "0085",
      name: "Talley Counter",
      brand: "Allele Diagnostic",
      type: "",
      category: "General Lab Equipment",
      cost: 33.5,
      price: 200.0,
      quantity: 1.0,
      unit: "Pcs/Pk",
      alertQuantity: 5,
    },
    {
      id: "2",
      date: "12/04/2023",
      image: "/product.jpg",
      code: "00857",
      name: "Sealent",
      brand: "Allele Diagnostic",
      type: "",
      category: "General Lab Equipment",
      cost: 33.0,
      price: 50.5,
      quantity: null,
      unit: "Pcs/Pk",
      alertQuantity: 5,
    },
  ],
};
