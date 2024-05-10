import type { Unit } from "@/components/Types";
import { generateId } from "@/components/utils";

export const unitsData: Unit[] = [
  {
    id: generateId(),
    createdAt: new Date(),
    code: "Vol/Pk",
    name: "Volume/Pack",
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    createdAt: new Date(),
    code: "Pcs/Pk",
    name: "Pieces/Pack",
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    createdAt: new Date(),
    code: "Pks",
    name: "Packs",
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    createdAt: new Date(),
    code: "Rolls",
    name: "Rolls",
    updatedAt: new Date(),
  },
];
