import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import { IProduct, cleanUpMockProducts, seedMockProducts, seedProductForeignKeys } from "@/utils";
import getProductsApi from "@/pages/api/product";

describe("tests api/product/api route", () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
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

    it("returns empty array if no products", async() => {
        req.method = "GET";
        await getProductsApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })

    it("fetches all products", async() => {
        req.method = "GET";
        // Mock data
        await seedMockProducts(3);
        await getProductsApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(3);
    })
})