import type { Quotation } from "@/components/Types";
import { generateId } from "@/components/utils";

export const allQuotationsData: Quotation[] = [
  {
    id: generateId(),
    createdAt: new Date(),
    quotationNumber: "PFI2023/06/001",
    customer: "PARTNERS IN HEALTH",
    total: 12000,
    quotationStatus: "Completed",
    products: [],
    tax: 345,
    subTotal: 5778,
    notes: "",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    quotationNumber: "PFI2023/06/001",
    customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
    total: 12000,
    quotationStatus: "Completed",
    products: [],
    tax: 345,
    subTotal: 5778,
    notes: "",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    quotationNumber: "PFI2023/06/001",
    customer: "GIMS HOSPITAL",
    total: 12000,
    quotationStatus: "Pending",
    products: [],
    tax: 345,
    subTotal: 5778,
    notes: "",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    quotationNumber: "PFI2023/06/001",
    customer: "Hope For Women",
    total: 12000,
    quotationStatus: "Cancelled",
    products: [],
    tax: 345,
    subTotal: 5778,
    notes: "",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    quotationNumber: "PFI2023/06/001",
    customer: "GIMS HOSPITAL",
    total: 12000,
    quotationStatus: "Pending",
    products: [],
    tax: 345,
    subTotal: 5778,
    notes: "",
    updatedAt: new Date(),
    isActive: true,
  },
];
