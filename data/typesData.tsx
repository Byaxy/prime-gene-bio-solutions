import type { ProductType } from "@/components/Types";
import { generateId } from "@/components/utils";

export const typesData: ProductType[] = [
  {
    id: generateId(),
    createdAt: new Date(),
    description: "Analyzers",
    name: "Analyzers",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    description: "Equipment",
    name: "Equipment",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    description: "Instruments",
    name: "Instruments",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    description: "Reagents",
    name: "Reagents",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    description: "Kits",
    name: "Kits",
    updatedAt: new Date(),
    isActive: true,
  },
];
