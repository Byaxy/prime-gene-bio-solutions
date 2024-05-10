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
    products: [],
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
    products: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];
