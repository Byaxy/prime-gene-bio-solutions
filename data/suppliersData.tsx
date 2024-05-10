import type { Supplier } from "@/components/Types";
import { generateId } from "@/components/utils";
export const suppliersData: Supplier[] = [
  {
    id: generateId(),
    name: "HEMOCUE AB",
    email: "Pierre.Costabel@hemocue.co.za",
    phone: "+27713859326",
    address: "262 23",
    city: "ANGELHOLM",
    state: "ANGELHOLM",
    country: "SWEDEN",
    contactPerson: { name: "", email: "", phone: "", isActive: true },
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    name: "Biorex Diagnostics Ltd",
    email: "info@biorexdiagnostics.com",
    phone: "+44 (0)2894 468786",
    address: "Unit 2C, Antrim Technology Park, Muckamore, BT41 1QS,",
    city: "Muckamore",
    state: "",
    country: "United Kingdom",
    contactPerson: { name: "", email: "", phone: "", isActive: true },
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];
