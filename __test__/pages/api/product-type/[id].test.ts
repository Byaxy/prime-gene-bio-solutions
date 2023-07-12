import HttpMocks from "node-mocks-http";
import { generateRandomString, seedMockProductTypes } from "@/utils";
import productTypeApi from "@/pages/api/product-type/[id]";
import prismaClient from "@/utils/prisma-client";
import { ProductType } from "@prisma/client";

describe("tests api/product-type/id route", () => {
    let req: any;
    let res: any;
    let productType: ProductType;
    let productTypeId: string;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        productType = (await seedMockProductTypes())[0];
        productTypeId = (await prismaClient.productType.findUnique({ where: { name: productType.name } }))?.id as string;
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.productType.deleteMany();
    })

    it("only accepts GET, PUT or DELETE requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("returns 400 if product-type ID is not in route", async() => {
        req.method = "GET";
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET product-type is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches product-type by Id", async() => {
        req.method = "GET";
        req.query = { id: productTypeId };
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toMatchObject({ 
            name: productType.name,
        });
    })

    it("does not update product-type if req.body has fields missing from product-type model", async () => {
        req.method = "PUT";
        req.query = { id: productTypeId };
        req.body = {};
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        const olderVersion = await prismaClient.productType.findUnique({ where: { id: productTypeId } });
        expect({
            id: productTypeId,
            name: productType.name,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("ignore extra fields not in product-type model", async() => {
        req.method = "PUT";
        req.query = { id: productTypeId };
        req.body = { field: "test" };
        await productTypeApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
        const olderVersion = await prismaClient.productType.findUnique({ where: { id: productTypeId } });
        expect({
            id: productTypeId,
            name: productType.name,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("updates a product-type", async() => {
        req.method = "PUT";
        req.query = { id: productTypeId };
        let changes = {
            name: generateRandomString(),
        };
        req.body = { ...changes };
        await productTypeApi(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        
        const newType = await prismaClient.productType.findUnique({ where: { name: changes.name } });

        expect(newType).toBeDefined();
        expect({ ...changes }).toEqual({ 
            name: newType?.name,
        });
    })

    it("returns 404 if no product to delete", async() => {
        req.method = "DELETE";
        req.query = { id: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }

        await productTypeApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe("Not Found");
    })

    it("deletes a product", async() => {
        req.method = "DELETE";
        req.query = { id: productTypeId }

        await productTypeApi(req, res);
        const result = await prismaClient.productType.findUnique({ where: { id: productTypeId } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect(result?.isActive).toBe(false);
    })
})