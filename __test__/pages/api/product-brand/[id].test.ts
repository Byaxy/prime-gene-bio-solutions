import HttpMocks from "node-mocks-http";
import { generateRandomString, seedMockProductBrands } from "@/utils";
import productBrandApi from "@/pages/api/product-brand/[id]";
import prismaClient from "@/utils/prisma-client";
import { ProductBrand } from "@prisma/client";

describe("tests api/product-brand/id route", () => {
    let req: any;
    let res: any;
    let productBrand: ProductBrand;
    let productBrandId: string;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        productBrand = (await seedMockProductBrands(1))[0];
        productBrandId = (await prismaClient.productBrand.findUnique({ where: { name: productBrand.name } }))?.id as string;
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.productBrand.deleteMany();
    })

    it("only accepts GET, PUT or DELETE requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("returns 400 if product-brand ID is not in route", async() => {
        req.method = "GET";
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET product-brand is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches product-brand by Id", async() => {
        req.method = "GET";
        req.query = { id: productBrandId };
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toMatchObject({ 
            name: productBrand.name,
        });
    })

    it("does not update product-brand if req.body has fields missing from product-brand model", async () => {
        req.method = "PUT";
        req.query = { id: productBrandId };
        req.body = {};
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        const olderVersion = await prismaClient.productBrand.findUnique({ where: { id: productBrandId } });
        expect({
            id: productBrandId,
            name: productBrand.name,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("ignore extra fields not in product-brand model", async() => {
        req.method = "PUT";
        req.query = { id: productBrandId };
        req.body = { field: "test" };
        await productBrandApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
        const olderVersion = await prismaClient.productBrand.findUnique({ where: { id: productBrandId } });
        expect({
            id: productBrandId,
            name: productBrand.name,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("updates a product-brand", async() => {
        req.method = "PUT";
        req.query = { id: productBrandId };
        let changes = {
            name: generateRandomString(),
        };
        req.body = { ...changes };
        await productBrandApi(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        
        const newBrand = await prismaClient.productBrand.findUnique({ where: { name: changes.name } });

        expect(newBrand).toBeDefined();
        expect({ ...changes }).toEqual({ 
            name: newBrand?.name,
        });
    })

    it("returns 404 if no product to delete", async() => {
        req.method = "DELETE";
        req.query = { id: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }

        await productBrandApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe("Not Found");
    })

    it("deletes a product", async() => {
        req.method = "DELETE";
        req.query = { id: productBrandId }

        await productBrandApi(req, res);
        const result = await prismaClient.productBrand.findUnique({ where: { id: productBrandId } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect(result?.isActive).toBe(false);
    })
})