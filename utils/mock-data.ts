import { generateRandomString } from "./functions";
import prismaClient from "./prisma-client";
import { IBarcodeSymbology, IProduct, IProductBrand, IProductCategory, IProductRelationships, IProductType, IUnitOfMeasure } from "./types";

export const mockUser = {
    firstname: "jane",
    lastname: "doe",
    email: "jane.doe@gmail.com",
    password: generateRandomString(),
}

/**
 * Generate values for the foreign key fields in the product model
 * @returns an object with key-value pair corresponding to the product model's foreign keys
 */
export async function seedProductForeignKeys(): Promise<IProductRelationships> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let fields: IProductRelationships;

    try {
        fields = {
            productTypeId: (await prismaClient.productType.create({ data: { name: "TypeA" } })).id,
            unitOfMeasureId: (await prismaClient.unitOfMeasure.create({ data: { name: "Pieces" } })).id,
            productBrandId: (await prismaClient.productBrand.create({ data: { name: "Super" } })).id,
            productCategoryId: (await prismaClient.productCategory.create({ data: { name: "CategoryA" } })).id,
            barcodeSymbologyId: (await prismaClient.barcodeSymbology.create({ data: { name: "UPC-A" } })).id,
        }
    } catch(e) {
        // Keys were already created; Just fetch from DB and return them
        fields = {
            productTypeId: (await prismaClient.productType.findUnique({ where: { name: "TypeA" } }))?.id as string,
            unitOfMeasureId: (await prismaClient.unitOfMeasure.findUnique({ where: { name: "Pieces" } }))?.id as string,
            productBrandId: (await prismaClient.productBrand.findUnique({ where: { name: "Super" } }))?.id as string,
            productCategoryId: (await prismaClient.productCategory.findUnique({ where: { name: "CategoryA" } }))?.id as string,
            barcodeSymbologyId: (await prismaClient.barcodeSymbology.findUnique({ where: { name: "UPC-A" } }))?.id as string,
        }
    }
    return fields;
}

/**
 * Create mock products and save them in the DB
 * @param qty number of products to create. Defaults to 1
 * @returns product(s) that were created and saved in the DB
 */
export async function seedMockProducts(qty: number = 1): Promise<IProduct | IProduct[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    
    let baseProduct = { ...(await seedProductForeignKeys()) };
    let products = [];

    for(let i = 0; i < qty; i++) {
        products.push({
            name: generateRandomString(),
            code: generateRandomString(12),
            cost: i * 5,
            price: i * 5,
            quantity: i * 5,
            alertQuantity: i * 5,
            isActive: true,
            details: null,
            images: [],
            ...baseProduct
        });
    }

    await prismaClient.product.createMany({ data: products });

    if(qty == 1) return products[0];
    return products;
}

/**
 * Delete product and its relationships from the DB once tests are done
 */
export async function cleanUpMockProducts() {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");

    await prismaClient.product.deleteMany();
    await prismaClient.productType.deleteMany();
    await prismaClient.unitOfMeasure.deleteMany();
    await prismaClient.productBrand.deleteMany();
    await prismaClient.productCategory.deleteMany();
    await prismaClient.barcodeSymbology.deleteMany();
}

export async function seedMockProductBrands(qty: number = 1): Promise<IProductBrand | IProductBrand[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let list = [];
    for(let i = 0; i < qty; i++) list.push({ name: generateRandomString(6) });
    await prismaClient.productBrand.createMany({ data: list });
    if(qty == 1) return list[0] ?? [];
    return list;
}

export async function seedMockUnitOfMeasures(qty: number = 1): Promise<IUnitOfMeasure | IUnitOfMeasure[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let list = [];
    for(let i = 0; i < qty; i++) list.push({ name: generateRandomString(6) });
    await prismaClient.unitOfMeasure.createMany({ data: list });
    if(qty == 1) return list[0] ?? [];
    return list;
}

export async function seedMockProductTypes(qty: number = 1): Promise<IProductType | IProductType[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let list = [];
    for(let i = 0; i < qty; i++) list.push({ name: generateRandomString(6) });
    await prismaClient.productType.createMany({ data: list });
    if(qty == 1) return list[0] ?? [];
    return list;
}

export async function seedMockProductCategories(qty: number = 1): Promise<IProductCategory | IProductCategory[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let list = [];
    for(let i = 0; i < qty; i++) list.push({ name: generateRandomString(6) });
    await prismaClient.productCategory.createMany({ data: list });
    if(qty == 1) return list[0] ?? [];
    return list;
}

export async function seedMockBarcodeSymbologies(qty: number = 1): Promise<IBarcodeSymbology | IBarcodeSymbology[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let list = [];
    for(let i = 0; i < qty; i++) list.push({ name: generateRandomString(6) });
    await prismaClient.barcodeSymbology.createMany({ data: list });
    if(qty == 1) return list[0] ?? [];
    return list;
}
