import HttpMocks from "node-mocks-http";
import { IProductCategory, seedMockProductCategories } from "@/utils";
import productCategoryApi from "@/pages/api/product-category";
import prismaClient from "@/utils/prisma-client";

describe("tests api/product-category/index route", () => {
    let req: any;
    let res: any;
    let categorys: IProductCategory[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        categorys = await seedMockProductCategories(3) as IProductCategory[];
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

    it("fetches archived categorys", async() => {
        // Archive an item
        await prismaClient.productCategory.update({ 
            where: { 
                name: categorys[0].name
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

    it("fetches active categorys by default", async() => {
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

    it("returns empty array if no categorys", async() => {
        req.method = "GET";
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})