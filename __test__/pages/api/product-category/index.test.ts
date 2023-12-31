import HttpMocks from "node-mocks-http";
import { seedMockProductCategories } from "@/utils";
import productCategoryApi from "@/pages/api/product-category";
import prismaClient from "@/utils/prisma-client";
import { ProductCategory } from "@prisma/client";

describe("tests api/product-category/index route", () => {
    let req: any;
    let res: any;
    let categories: ProductCategory[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        categories = await seedMockProductCategories(3);
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

    it("does not fetch sub-categories", async() => {
        let result = await seedMockProductCategories(1, categories[0].id);
        req.method = "GET";
        await productCategoryApi(req, res);
        const subset = res._getJSONData().filter((el: ProductCategory) => el.id === result[0].id);
        expect(res._getJSONData()).toHaveLength(2);
        expect(subset).toHaveLength(0);
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