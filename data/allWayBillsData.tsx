import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { WayBill } from "@/components/Types";

export const allWayBillsData: WayBill[] = [
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
];
