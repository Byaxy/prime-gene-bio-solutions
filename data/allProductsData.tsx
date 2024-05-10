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
        id: "c9376388",
        lotNumber: "2302808",
        manufactureDate: new Date("2020-04-06T00:00:00.000Z"),
        expiryDate: new Date("2020-04-06T00:00:00.000Z"),
        quantity: 21,
        createdAt: new Date("2024-04-06T17:16:59.032Z"),
        updatedAt: new Date("2024-04-09T16:07:07.331Z"),
      },
      {
        id: "c8ce6da1",
        lotNumber: "2301608",
        manufactureDate: new Date("2020-04-06T00:00:00.000Z"),
        expiryDate: new Date("2020-04-06T00:00:00.000Z"),
        quantity: 17,
        createdAt: new Date("2024-04-06T17:16:59.032Z"),
        updatedAt: new Date("2024-04-09T16:07:07.331Z"),
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
        id: "c9376388",
        lotNumber: "2302808",
        manufactureDate: new Date("2020-04-06T00:00:00.000Z"),
        expiryDate: new Date("2020-04-06T00:00:00.000Z"),
        quantity: 21,
        createdAt: new Date("2024-04-06T17:16:59.032Z"),
        updatedAt: new Date("2024-04-09T16:07:07.331Z"),
      },
<<<<<<< HEAD
    },
  ],
  data: [
    {
      id: "1",
      createdAt: new Date(),
      image: "/product.jpg",
      code: "0085",
      name: "Talley Counter",
      brand: "Allele Diagnostic",
      type: "Sample Type",
      category: "General Lab Equipment",
      productQuantity: 1,
      stock: [
        {
          id: "01",
          lotNumber: "001",
          manufactureDate: new Date("2021-01-01"),
          expiryDate: new Date("2024-01-01"),
          quantity: 12.0,
        },
        {
          id: "02",
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
      gallery: [],
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      createdAt: new Date(),
      image: "/product.jpg",
      code: "00857",
      name: "Sealent",
      brand: "Allele Diagnostic",
      type: "Sample type",
      category: "General Lab Equipment",
      productQuantity: 1,
      stock: [
        {
          id: "01",
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
      gallery: [],
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
=======
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
>>>>>>> restructure
