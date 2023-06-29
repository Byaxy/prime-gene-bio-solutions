import HttpMocks from "node-mocks-http";
import { IProductBrand, seedMockProductBrands } from "@/utils";
import productBrandApi from "@/pages/api/product-brand";
import prismaClient from "@/utils/prisma-client";

describe("tests api/product-brand/index route", () => {
    let req: any;
    let res: any;
    let brands: IProductBrand[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        brands = await seedMockProductBrands(3) as IProductBrand[];
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.productBrand.deleteMany();
    })

    it("only accepts GET requests", async() => {
        req.method = "POST";
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET");
    })

    it("fetches archived brands", async() => {
        // Archive an item
        await prismaClient.productBrand.update({ 
            where: { 
                name: brands[0].name
            },
            data: {
                isActive: false
            }
        })

        req.method = "GET";
        req.query = { isActive: "false" };
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(1);        
    })

    it("fetches active brands by default", async() => {
        req.method = "GET";
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(2);
    })
})

describe("tests api/product-brand/index route if table is empty", () => {
    let req: any = HttpMocks.createRequest();
    let res: any = HttpMocks.createResponse();

    it("returns empty array if no brands", async() => {
        req.method = "GET";
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})