import { generateRandomString } from "./functions";
import prismaClient from "./prisma-client";
import { ProductCategory, ProductType, ProductBrand, BarcodeSymbology, Product, UnitOfMeasure } from "@prisma/client";
import { IProductRelationships } from "./types";

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
            productCategoryId: (await prismaClient.productCategory.create({ 
                data: { name: "CategoryA", code: "RED" } 
            })).id,
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
export async function seedMockProducts(qty: number = 1): Promise<Product[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    
    let baseProduct = { ...(await seedProductForeignKeys()) };

    let result = await prismaClient.$transaction(
        [...Array(qty)].map((_, i) => prismaClient.product.create({ 
            data: {
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
            }
        }))
    );

    return result;
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

export async function seedMockProductBrands(qty: number = 1): Promise<ProductBrand[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let result = await prismaClient.$transaction(
        [...Array(qty)].map((_) => prismaClient.productBrand.create({ 
            data: {
                name: generateRandomString(6),
            }
        }))
    );
    return result;
}

export async function seedMockUnitOfMeasures(qty: number = 1): Promise<UnitOfMeasure[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let result = await prismaClient.$transaction(
        [...Array(qty)].map((_) => prismaClient.unitOfMeasure.create({ 
            data: {
                name: generateRandomString(6),
            }
        }))
    );
    return result;
}

export async function seedMockProductTypes(qty: number = 1): Promise<ProductType[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let result = await prismaClient.$transaction(
        [...Array(qty)].map((_) => prismaClient.productType.create({ 
            data: {
                name: generateRandomString(6),
            }
        }))
    );
    return result;
}

export async function seedMockProductCategories(qty: number = 1, parentId: string | null = null): Promise<ProductCategory[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let result = await prismaClient.$transaction(
        [...Array(qty)].map((_) => prismaClient.productCategory.create({ 
            data: {
                name: generateRandomString(6),
                code: generateRandomString(6),
                parentCategoryId: parentId            
            }
        }))
    );
    return result;
}

export async function seedMockBarcodeSymbologies(qty: number = 1): Promise<BarcodeSymbology[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    let result = await prismaClient.$transaction(
        [...Array(qty)].map((_) => prismaClient.barcodeSymbology.create({ 
            data: {
                name: generateRandomString(6),
            }
        }))
    );
    return result;
}
