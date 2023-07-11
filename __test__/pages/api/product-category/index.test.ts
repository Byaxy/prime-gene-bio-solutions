import HttpMocks from "node-mocks-http";
import { IProductCategory, seedMockProductCategories } from "@/utils";
import productCategoryApi from "@/pages/api/product-category";
import prismaClient from "@/utils/prisma-client";
import { ProductCategory } from "@prisma/client";

describe("tests api/product-category/index route", () => {
    let req: any;
    let res: any;
    let categories: IProductCategory[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        categories = await seedMockProductCategories(3) as IProductCategory[];
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.productCategory.deleteMany();
    })

    it("only accepts GET requests", async() => {
        req.method = "POST";
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET");
    })

    it("fetches archived categories", async() => {
        // Archive an item
        await prismaClient.productCategory.update({ 
            where: { 
                name: categories[0].name
            },
            data: {
                isActive: false
            }
        })

        req.method = "GET";
        req.query = { isActive: "false" };
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(1);        
    })

    it("fetches active categories by default", async() => {
        req.method = "GET";
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(2);
    })
})

describe("tests api/product-category/index route if table is empty", () => {
    let req: any = HttpMocks.createRequest();
    let res: any = HttpMocks.createResponse();

    it("returns empty array if no categories", async() => {
        req.method = "GET";
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})

describe("tests recursive subcategories", () => {
    let categories: IProductCategory[] = [];

    beforeAll(async () => {
        // Generate parent
        let parent = await seedMockProductCategories() as IProductCategory;
        categories.push(parent);
        // Generate sub-categories
        let children = await seedMockProductCategories(3, parent.id) as IProductCategory[];

        // Generate sub-sub-categories
        let grandChildren = await seedMockProductCategories(2, children[0].id) as IProductCategory[];
        grandChildren.forEach(el => categories.push(el));
    });

    afterAll(async () => {
        await prismaClient.productCategory.deleteMany();
    });

    it("fetches a category and its sub categories", async() => {
        let result = await prismaClient.productCategory.findFirst({
            where: {
                id: categories[0].id
            },
            include: {
                subCategories: true
            }
        });

        expect(result?.subCategories).toHaveLength(3);
    })

    it("gets ancestry tree given child category id", async() => {
        let child = categories.at(-1);

        const result = await prismaClient.$queryRaw<ProductCategory[]>`
            WITH RECURSIVE subcategories AS (
                SELECT id, name, code, description, parent_category AS "parentCategoryId"
                FROM product_category 
                WHERE id = ${child?.id} 
                UNION 
                SELECT p.id, p.name, p.code, p.description, p.parent_category AS "parentCategoryId"
                FROM product_category p 
                INNER JOIN subcategories s 
                ON s."parentCategoryId" = p.id
            )
            SELECT * FROM subcategories
        `;

        expect(result).toHaveLength(3);
        expect(result[0].parentCategoryId).toEqual(result[1].id);
        expect(result[1].parentCategoryId).toEqual(result[2].id);
        expect(result[2].parentCategoryId).toBeNull();
    })
})