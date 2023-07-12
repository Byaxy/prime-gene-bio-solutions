import HttpMocks from "node-mocks-http";
import { seedMockProductTypes } from "@/utils";
import productTypeApi from "@/pages/api/product-type";
import prismaClient from "@/utils/prisma-client";
import { ProductType } from "@prisma/client";

describe("tests api/product-type/index route", () => {
    let req: any;
    let res: any;
    let types: ProductType[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        types = await seedMockProductTypes(3);
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.productType.deleteMany();
    })

    it("only accepts GET requests", async() => {
        req.method = "POST";
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET");
    })

    it("fetches archived types", async() => {
        // Archive an item
        await prismaClient.productType.update({ 
            where: { 
                name: types[0].name
            },
            data: {
                isActive: false
            }
        })

        req.method = "GET";
        req.query = { isActive: "false" };
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(1);        
    })

    it("fetches active types by default", async() => {
        req.method = "GET";
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(2);
    })
})

describe("tests api/product-type/index route if table is empty", () => {
    let req: any = HttpMocks.createRequest();
    let res: any = HttpMocks.createResponse();

    it("returns empty array if no types", async() => {
        req.method = "GET";
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})