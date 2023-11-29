export type CustomerGroups = {
     id: string;
     name: string;
     percentage: number;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type Brand = {
     id: string;
     name: string;
     code: string;
     image: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type Types ={
     id: string;
     name: string;
     description: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type Unit = {
     id: string;
     name: string;
     code: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type ProductCategory = {
     id: string;
     code: string;
     name: string;
     description: string;
     image: string;
     subCategories?: ProductSubCategory[]
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type ProductSubCategory = ProductCategory & {
     parentCategory: string;
}
export type ExpenseCategory = {
     id: string;
     name: string;
     code: string;
     description: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export enum Gender {
     MALE = "MALE",
     FEMALE = "FEMALE",
     OTHER = "OTHER"
}
export enum UserRole  {
     USER = "USER",
     ADMIN = "ADMIN"
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
     confirmPassword: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type Supplier = {
     id: string;
     company: string;
     name: string;
     email: string;
     phone: string;
     address: string;
     city: string;
     state: string;
     postalCode: string;
     country: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type Customer = {
     id: string;
     customerGroup: string;
     company: string;
     name: string;
     email: string;
     phone: string;
     address: string;
     city: string;
     state: string;
     postalCode: string;
     country: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
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
}
export type Product = {
     id: string;
     code: string;
     name: string;
     image: string;
     gallery: string[];
     brand: string;
     type: string;
     unit: string;
     category: string;
     lotNo: string,
     stock: Stock[];
     cost: number;
     price: number;
     description: string;
     alertQuantity: number;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}
export type Stock = {
     id: string;
     lotNumber: string;
     manufactureDate: Date;
     expiryDate: Date;
     quantity: number;
}
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
}
export type InvoiceProduct = {
     name: string,
     description: string,
     quantity: number,
     price: number,
     subTotal: number,
}
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
     products: Product[];
     notes: string;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}