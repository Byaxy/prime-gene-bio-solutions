import HttpMocks from "node-mocks-http";
import { seedMockProductBrands } from "@/utils";
import productBrandApi from "@/pages/api/product-brand";
import prismaClient from "@/utils/prisma-client";

describe("tests api/product-brand/index route", () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
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

    it("returns empty array if no brands", async() => {
        req.method = "GET";
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })

    it("fetches all brands", async() => {
        req.method = "GET";
        // Mock data
        await seedMockProductBrands(3);
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(3);
    })
})