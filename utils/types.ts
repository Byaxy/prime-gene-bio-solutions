export enum Roles {
    ADMIN,
    USER
}

export interface IProductRelationships {
    productTypeId: string;
    unitOfMeasureId: string;
    productBrandId: string;
    productCategoryId: string;
    barcodeSymbologyId: string;
}

export interface IProduct extends IProductRelationships {
    id?: string;
    name: string;
    code: string;
    cost: number;
    price: number;
    quantity: number;
    alertQuantity: number;
    details?: string;
    images?: string[];
}