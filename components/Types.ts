export type Option = {
  label: string;
  value: string;
};
export type CustomerGroup = {
  id: string;
  name: string;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Brand = {
  id: string;
  name: string;
  code: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type ProductType = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Unit = {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type ProductCategory = {
  id: string;
  code: string;
  name: string;
  parentCategory: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type ExpenseCategory = {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
export type User = {
  id: string;
  image: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contactPerson?: ContactPerson;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type ContactPerson = {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
};

export type Customer = {
  id: string;
  customerGroup: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contactPerson?: ContactPerson;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Expense = {
  id: string;
  date: Date;
  title: string;
  reference: string;
  category: string;
  description: string;
  amount: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Product = {
  id: string;
  code: string;
  name: string;
  image: string;
  brand: string;
  type: string;
  unit: string;
  category: string;
  stock: Stock[];
  cost: number;
  price: number;
  description: string;
  alertQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Stock = {
  id: string;
  lotNumber: string;
  manufactureDate: Date;
  expiryDate: Date;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
export type ProductStock = {
  id: string;
  name: string;
  lotNumber: string;
  manufactureDate: Date;
  expiryDate: Date;
  quantity: number;
  reference: string;
  description: string;
  attachment: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type SaleProduct = {
  id: string;
  lotNumber: string;
  name: string;
  code: string;
  unit: string;
  quantity: number;
  availableQuantity: number;
  price: number;
  subTotal: number;
};

export type Sale = {
  id: string;
  invoiceNumber: string;
  purchaseOrderNumber: string;
  customer: string;
  tax: number;
  subTotal: number;
  total: number;
  paid: number;
  paymentStatus: string;
  saleStatus: string;
  products: SaleProduct[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type Quotation = {
  id: string;
  quotationNumber: string;
  customer: string;
  tax: number;
  subTotal: number;
  total: number;
  quotationStatus: string;
  products: SaleProduct[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type DeliveryProduct = {
  id: string;
  lotNumber: string;
  code: string;
  name: string;
  quantityRequested: number;
  quantitySupplied: number;
  unit: string;
  price: number;
  subTotal: number;
};
export type Delivery = {
  id: string;
  date: Date;
  saleInvoiceNumber: string;
  deliveryReferenceNumber: string;
  description: string;
  customer: string;
  address: string;
  products: DeliveryProduct[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
export type WayBill = {
  id: string;
  date: Date;
  deliveryReferenceNumber: string;
  customer: string;
  address: string;
  products: DeliveryProduct[];
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type ProductWithNoStock = Omit<Product, "stock">;
export type ProductWithStock = ProductWithNoStock & { stock: Stock };

export type SaleReturn = {
  id: string;
  date: Date;
  saleInvoiceNumber: string;
  deliveryReferenceNumber: string;
  description: string;
  customer: string;
  products: ReturnProduct[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type ReturnProduct = {
  id: string;
  lotNumber: string;
  name: string;
  code: string;
  unit: string;
  quantityReturned: number;
  quantityRequested: number;
  quantitySupplied: number;
  price: number;
  subTotal: number;
};

export type PurchaseProduct = {
  id: string;
  lotNumber: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  subTotal: number;
};

export type Purchase = {
  id: string;
  date: Date;
  purchaseOrderNumber: string;
  supplier: string;
  total: number;
  paid: number;
  paymentStatus: string;
  purchaseStatus: string;
  products: PurchaseProduct[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
