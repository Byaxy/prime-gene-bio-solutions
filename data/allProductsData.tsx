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
  code: number;
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
      selector: (row: { code: number }) => row.code,
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
      cell: (row: { code: number }) => [
        <Link href={`/products/edit-product/${row.code}`} key={row.code}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.code} href="/products">
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
      image: "/product.jpg",
      code: 1,
      name: "15/06/2023",
      brand: "PO2023/06/001",
      category: "MICROPROFIT",
      cost: "$12000",
      price: "Paid",
      quantity: "Recieved",
      unit: "",
      alertQuantity: "",
      actions: "",
    },
    {
      image: "/product.jpg",
      code: 2,
      name: "15/06/2023",
      brand: "PO2023/06/001",
      category: "MICROPROFIT",
      cost: "$12000",
      price: "Paid",
      quantity: "Recieved",
      unit: "",
      alertQuantity: "",
      actions: "",
    },
  ],
};
