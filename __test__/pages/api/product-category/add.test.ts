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
        let product = {
            name: generateRandomString()
        }

        req.body = { ...product };

        await addProductCategoryApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.productCategory.findUnique({
            where: {
                name: product.name
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(product);
    })

    it("fails to save category due to duplicate name", async() => {
        let product = { name: generateRandomString() };

        await prismaClient.productCategory.create({ data: { ...product } });
        req.method = "POST";
        req.body = { name: product.name };

        await addProductCategoryApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`name`)");
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