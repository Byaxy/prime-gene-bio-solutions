import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import addProductCategoryApi from "@/pages/api/product-category/add";
import { generateRandomString } from "@/utils";

describe("tests the api/product-category/add route", () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    afterAll(async() => {
        // Clear DB
        await prismaClient.productCategory.deleteMany();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await addProductCategoryApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST");
    })

    it("inserts a category in the database", async() => {
        req.method = "POST";
        let category = {
            name: generateRandomString(),
            code: generateRandomString(),
        }

        req.body = { ...category };

        await addProductCategoryApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.productCategory.findUnique({
            where: {
                name: category.name
            }
        });

        expect(result).toBeDefined();
        expect(result).toEqual(JSON.parse(
            res._getData(),
            // Dates were converted to strings when response was stringified.
            // Reconvert them to date objects
            function (key, value) {
                if (key === "createdAt" || key === "updatedAt") return new Date(value);
                return value;
            }
        ));
    })

    it("fails to save category due to duplicate name", async() => {
        let productCategory = { name: generateRandomString(), code: generateRandomString() };

        await prismaClient.productCategory.create({ data: { ...productCategory } });
        req.method = "POST";
        req.body = { name: productCategory.name, code: generateRandomString() };

        await addProductCategoryApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`name`)");
    })

    it("fails to save category due to duplicate code", async() => {
        let productCategory = { name: generateRandomString(), code: generateRandomString() };

        await prismaClient.productCategory.create({ data: { ...productCategory } });
        req.method = "POST";
        req.body = { name: generateRandomString(), code: productCategory.code };

        await addProductCategoryApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`code`)");
    })

    it("fails on missing required fields", async() => {  
        req.body = {};
        req.method = "POST";
        await addProductCategoryApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Some required fields are missing. Please check the data sent and try again");
    })
})