import type { ProductCategory } from "@/components/Types";

export const categoriesData: ProductCategory[] = [
  {
    id: "01",
    createdAt: new Date(),
    code: "01",
    name: "Clinical Laboratory Solutions",
    parentCategory: "",
    description: "Clinical laboratory solutions products",
    updatedAt: new Date(),
  },
  {
    id: "02",
    createdAt: new Date(),
    code: "02",
    name: "Medical Solutions",
    parentCategory: "",
    description: "Medical solutions products",
    updatedAt: new Date(),
  },
  {
    id: "03",
    createdAt: new Date(),
    code: "03",
    name: "Imaging Solutions",
    parentCategory: "",
    description: "Imaging solutions products",
    updatedAt: new Date(),
  },
  {
    id: "04",
    createdAt: new Date(),
    code: "04",
    name: "Dental Solutions",
    parentCategory: "",
    description: "Dental solutions products",
    updatedAt: new Date(),
  },
];
