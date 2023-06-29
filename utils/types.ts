export enum Roles {
    ADMIN,
    USER
}

interface IBaseModel {
    id?: string;
    createdAt?: Date,
    updatedAt?: Date
}

export interface IProductRelationships {
    productTypeId: string;
    unitOfMeasureId: string;
    productBrandId: string;
    productCategoryId: string;
    barcodeSymbologyId: string;
}

export interface IProduct extends IProductRelationships, IBaseModel {
    name: string;
    code: string;
    cost: number;
    price: number;
    quantity: number;
    alertQuantity: number;
    details?: string;
    images?: string[];
    isActive: boolean
}

export interface IProductBrand extends IBaseModel {
    name: string
}

export interface IProductCategory extends IBaseModel {
    name: string
}

export interface IUnitOfMeasure extends IBaseModel {
    name: string
}

export interface IProductType extends IBaseModel {
    name: string
}

export interface IBarcodeSymbology extends IBaseModel {
    name: string
}