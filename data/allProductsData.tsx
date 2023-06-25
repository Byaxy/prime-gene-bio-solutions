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
  id: number;
  code: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  cost: string;
  price: string;
  quantity: string;
  unit: string;
  alertQuantity: string;
  actions: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const allproductsData: DataType = {
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
          height={50}
          width={50}
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
      name: "Cost",
      selector: (row: { cost: string }) => row.cost,
    },
    {
      name: "Price",
      selector: (row: { price: string }) => row.price,
    },
    {
      name: "Quantity",
      selector: (row: { quantity: string }) => row.quantity,
    },
    {
      name: "Unit",
      selector: (row: { unit: string }) => row.unit,
    },
    {
      name: "Alert Quantity",
      selector: (row: { alertQuantity: string }) => row.alertQuantity,
    },
    {
      name: "Actions",
      cell: (row: { id: number }) => [
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
      id: 1,
      image: "/product.jpg",
      code: "0085",
      name: "Talley Counter",
      brand: "Allele Diagnostic",
      category: "General Lab Equipment",
      cost: "$33.o",
      price: "$200.00",
      quantity: "1.00",
      unit: "Pcs/Pk",
      alertQuantity: "5",
      actions: "",
    },
    {
      id: 2,
      image: "/product.jpg",
      code: "00857",
      name: "Sealent",
      brand: "Allele Diagnostic",
      category: "General Lab Equipment",
      cost: "$33.00",
      price: "$50.00",
      quantity: "",
      unit: "Pcs/Pk",
      alertQuantity: "5",
      actions: "",
    },
  ],
};
