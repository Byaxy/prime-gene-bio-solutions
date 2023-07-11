import HttpMocks from "node-mocks-http";
import { generateRandomString, seedMockProductCategories } from "@/utils";
import productCategoryApi from "@/pages/api/product-category/[id]";
import prismaClient from "@/utils/prisma-client";
import { ProductCategory } from "@prisma/client";

describe("tests api/product-category/id route", () => {
    let req: any;
    let res: any;
    let productCategory: ProductCategory;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        productCategory = (await seedMockProductCategories(1))[0];
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.productCategory.deleteMany();
    })

    it("only accepts GET, PUT or DELETE requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("returns 400 if product-category ID is not in route", async() => {
        req.method = "GET";
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET product-category is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches product-category by Id", async() => {
        req.method = "GET";
        req.query = { id: productCategory.id };
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toMatchObject({ 
            name: productCategory.name,
        });
    })

    it("does not update product-category if req.body is empty", async () => {
        req.method = "PUT";
        req.query = { id: productCategory.id };
        req.body = {};
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        const olderVersion = await prismaClient.productCategory.findUnique({ where: { id: productCategory.id } });
        expect({ ...productCategory }).toEqual(olderVersion);
    })

    it("ignore extra fields not in product-category model", async() => {
        req.method = "PUT";
        req.query = { id: productCategory.id };
        req.body = { field: "test" };
        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
        const olderVersion = await prismaClient.productCategory.findUnique({ where: { id: productCategory.id } });
        expect({
            ...productCategory
        }).toEqual(olderVersion);
    })

    it("updates a product-category", async() => {
        req.method = "PUT";
        req.query = { id: productCategory.id };
        let changes = {
            name: generateRandomString(),
        };
        req.body = { ...changes };
        await productCategoryApi(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        
        const updatedCategory = await prismaClient.productCategory.findUnique({ where: { name: changes.name } });

        expect(updatedCategory).toBeDefined();
        expect({  ...productCategory, ...changes, updatedAt: updatedCategory?.updatedAt }).toEqual({ ...updatedCategory });
    })

    it("returns 404 if no product to delete", async() => {
        req.method = "DELETE";
        req.query = { id: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }

        await productCategoryApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe("Not Found");
    })

    it("deletes a product", async() => {
        req.method = "DELETE";
        req.query = { id: productCategory.id }

        await productCategoryApi(req, res);
        const result = await prismaClient.productCategory.findUnique({ where: { id: productCategory.id } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect(result?.isActive).toBe(false);
    })
})