import type { Delivery } from "@/components/Types";

export const allDeliveriesData: Delivery[] = [
  {
    id: "1",
    date: new Date(),
    saleInvoiceNumber: "Inv.2023/06/001",
    deliveryReferenceNumber: "DO2023/06/0345",
    description: "P04-03-101139-00 - GENRUI KT03A Lyse Solution",
    customer: "PARTNERS IN HEALTH",
    address: "Congo Town",
    status: "Recieved",
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
    saleInvoiceNumber: "Inv.2023/06/001",
    deliveryReferenceNumber: "DO2023/06/0344",
    description: "P04-03-101139-00 - GENRUI KT03A Lyse Solution",
    customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
    address: "Congo Town",
    status: "Recieved",
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
