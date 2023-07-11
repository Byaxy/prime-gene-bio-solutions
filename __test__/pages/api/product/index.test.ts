import HttpMocks from "node-mocks-http";
import { cleanUpMockProducts, seedMockProducts } from "@/utils";
import getProductsApi from "@/pages/api/product";
import prismaClient from "@/utils/prisma-client";
import { Product } from "@prisma/client";

describe("tests api/product/api route", () => {
    let req: any;
    let res: any;
    let products: Product[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        products = await seedMockProducts(3);
    })

    afterAll(async () => {
        // Clear DB
        await cleanUpMockProducts();
    })

    it("only accepts GET requests", async() => {
        req.method = "POST";
        await getProductsApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET");
    })

    it("fetches archived products", async() => {
        // Archive an item
        await prismaClient.product.update({ 
            where: { 
                code: products[0].code
            },
            data: {
                isActive: false
            }
        })

        req.method = "GET";
        req.query = { isActive: "false" };
        await getProductsApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(1);        
    })

    it("fetches active products by default", async() => {
        req.method = "GET";
        await getProductsApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(2);
    })
})

describe("tests api/product/index route if table is empty", () => {
    let req: any = HttpMocks.createRequest();
    let res: any = HttpMocks.createResponse();

    it("returns empty array if no brands", async() => {
        req.method = "GET";
        await getProductsApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})