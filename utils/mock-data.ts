import { Prisma } from "@prisma/client";
import { generateRandomString } from "./functions";
import prismaClient from "./prisma-client";
import { IProduct, IProductRelationships } from "./types";

export const mockUser = {
    firstname: "jane",
    lastname: "doe",
    email: "jane.doe@gmail.com",
    password: generateRandomString(),
}

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

export async function seedMockProducts(qty: number = 1): Promise<IProduct | IProduct[]> {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");
    
    if(qty < 1) return [];

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
            ...baseProduct
        });
    }

    await prismaClient.product.createMany({ data: products });

    if(qty == 1) return products[0];
    return products;
}

export async function cleanUpMockProducts() {
    if (process.env.NODE_ENV !== "test") throw new Error("Illegal function call");

    await prismaClient.product.deleteMany();
    await prismaClient.productType.deleteMany();
    await prismaClient.unitOfMeasure.deleteMany();
    await prismaClient.productBrand.deleteMany();
    await prismaClient.productCategory.deleteMany();
    await prismaClient.barcodeSymbology.deleteMany();
}