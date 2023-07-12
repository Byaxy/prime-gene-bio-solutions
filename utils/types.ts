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