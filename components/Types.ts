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
export type ProductCategory ={
     id: string;
     code: string;
     name: string;
     description: string;
     image: string;
     parentCategory: string;
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
     cost: number;
     price: number;
     description: string;
     alertQuantity: number;
     quantity: number;
     createdAt: Date;
     updatedAt: Date;
     isActive: boolean;
}