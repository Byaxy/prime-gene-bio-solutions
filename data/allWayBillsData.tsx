import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { WayBill } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: WayBill) => any;
  width?: string;
  cell?: any;
  style?: {
    display?: string;
    justifyContent?: string;
    gap?: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
  };
  conditionalCellStyles?: {
    when: (row: WayBill) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: WayBill[];
};

export const allWayBillsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: Date }) => row.date.toDateString(),
    },
    {
      name: "Delivery Ref No.",
      selector: (row: { deliveryReferenceNumber: string }) =>
        row.deliveryReferenceNumber,
    },
    {
      name: "Amount",
      selector: (row: { amount: number }) => row.amount,
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
    },
    {
      name: "Address",
      selector: (row: { address: string }) => row.address,
    },

    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/sales/deliveries/edit-delivery/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/sales/deliveries">
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
      date: new Date(),
      deliveryReferenceNumber: "DO2023/06/0345",
      description: "Products delivered sucessfully",
      customer: "PARTNERS IN HEALTH",
      address: "Congo Town",
      amount: 1000,
      products: [
        {
          id: "1",
          lotNumber: "P04-03-101139-00",
          name: "KT03A Lyse Solution",
          quantityRequested: 10,
          quantitySupplied: 8,
        },
        {
          id: "2",
          lotNumber: "P04-03-101139-00",
          name: "GENRUI KT03A Lyse Solution",
          quantityRequested: 8,
          quantitySupplied: 8,
        },
        {
          id: "3",
          lotNumber: "P04-03-101139-00",
          name: "GENRUI Solution",
          quantityRequested: 8,
          quantitySupplied: 8,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      date: new Date(),
      deliveryReferenceNumber: "DO2023/06/0344",
      description: "Products delivered to the customer successfully",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      address: "Monrovia, Liberia",
      amount: 1200,
      products: [
        {
          id: "1",
          lotNumber: "P04-03-101139-00",
          name: "P04-03-101139-00 - GENRUI KT03A Lyse Solution",
          quantityRequested: 10,
          quantitySupplied: 8,
        },
        {
          id: "2",
          lotNumber: "P04-03-101139-00",
          name: "GENRUI KT03A Lyse Solution",
          quantityRequested: 8,
          quantitySupplied: 8,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
