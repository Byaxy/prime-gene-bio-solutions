import type { Product } from "@/components/Types";
import { generateId } from "@/components/utils";

export const allProductsData: Product[] = [
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/product.jpg",
    code: "0085",
    name: "Talley Counter",
    brand: "Allele Diagnostic",
    type: "Sample Type",
    category: "General Lab Equipment",
    stock: [
      {
        id: generateId(),
        lotNumber: "001",
        manufactureDate: new Date("2021-01-01"),
        expiryDate: new Date("2024-01-01"),
        quantity: 12.0,
      },
      {
        id: generateId(),
        lotNumber: "002",
        manufactureDate: new Date("2021-02-01"),
        expiryDate: new Date("2024-02-01"),
        quantity: 10.0,
      },
    ],
    cost: 33.5,
    price: 200.0,
    unit: "Pcs/Pk",
    alertQuantity: 5,
    description: "",
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    createdAt: new Date(),
    image: "/product.jpg",
    code: "00857",
    name: "Sealent",
    brand: "Allele Diagnostic",
    type: "Sample type",
    category: "General Lab Equipment",
    stock: [
      {
        id: generateId(),
        lotNumber: "001",
        manufactureDate: new Date("2021-01-01"),
        expiryDate: new Date("2024-01-01"),
        quantity: 10.0,
      },
    ],
    cost: 33.0,
    price: 50.5,
    unit: "Pcs/Pk",
    alertQuantity: 5,
    description: "",
    updatedAt: new Date(),
    isActive: true,
  },
];
