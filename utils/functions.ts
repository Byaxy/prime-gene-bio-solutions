import bcrypt from "bcrypt";
import prismaClient from "./prisma-client";
import { ProductCategory } from "@prisma/client";

export function generateRandomString(length: number = 8): string {
    let chars: string = "0123456789abcdefghijklmnopqrstuvwxyz@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password: string = "";

    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * chars.length);
        password += chars[r];
    }

    return password;
}

export async function hashPassword(password: string | undefined, saltRounds: number = 11): Promise<string> {
    if (!password) throw new Error("Password cannot be null or undefined");
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string | undefined, hash: string): Promise<boolean> {
    if (!password) return false;
    return bcrypt.compare(password, hash);
}

export async function getProductCategoryBreadcrumb(categoryId: String): Promise<String[]> {
    const result = await prismaClient.$queryRaw<ProductCategory[]>`
        WITH RECURSIVE subcategories AS (
            SELECT id, name, parent_category AS "parentCategoryId"
            FROM product_category 
            WHERE id = ${categoryId} 
            UNION 
            SELECT p.id, p.name, p.parent_category AS "parentCategoryId"
            FROM product_category p 
            INNER JOIN subcategories s 
            ON s."parentCategoryId" = p.id
        )
        SELECT * FROM subcategories WHERE id <> ${categoryId};
    `;

    let breadcrumbs: String[] = [];

    for (let i = result.length - 1; i >= 0; --i) {
        breadcrumbs.push(result[i].name);
    }

    return breadcrumbs;
}