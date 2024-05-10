import type { Brand } from "@/components/Types";
import { generateId } from "@/components/utils";

export const brandsData: Brand[] = [
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/biorex.jpg",
    code: "BK",
    name: "BIOREX UK",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/citotest.png",
    code: "CITOTEST",
    name: "Citotest Scientific Co Ltd",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/dlab.png",
    code: "DLAB",
    name: "DLAB",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/tulip.png",
    code: "Tulip 011",
    name: "Tulip Diagnostics",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/hemocue.png",
    code: "HEMOCUE",
    name: "HEMOCUE AB",
    updatedAt: new Date(),
    isActive: true,
  },
];
