import { ProductStock } from "@/components/Types";
type HeaderCells = {
  name: string;
  selector?: (row: ProductStock) => any;
};

export const productsStockData: ProductStock[] = [
  {
    id: "1",
    name: "HemoCue Hb-801 Mcrocuvette",
    lotNumber: "2301606",
    manufactureDate: new Date(),
    expiryDate: new Date(),
    quantity: 0,
    reference: "PO-0001",
    description: "",
    attachment: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
  },
];
export const columns: HeaderCells[] = [
  {
    name: "Product Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Lot Number",
    selector: (row: { lotNumber: string }) => row.lotNumber,
  },
  {
    name: "Manufacture Date",
    selector: (row: { manufactureDate: Date }) =>
      row.manufactureDate.toDateString(),
  },
  {
    name: "Expiry Date",
    selector: (row: { expiryDate: Date }) => row.expiryDate.toDateString(),
  },
  {
    name: "Quantity",
    selector: (row: { quantity: number }) => row.quantity,
  },
];
