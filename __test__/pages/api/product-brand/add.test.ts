import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import addProductBrandApi from "@/pages/api/product-brand/add";
import { generateRandomString } from "@/utils";

describe("tests the api/product-brand/add route", () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    afterAll(async() => {
        // Clear DB
        await prismaClient.productBrand.deleteMany();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await addProductBrandApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST");
    })

    it("inserts a brand in the database", async() => {
        req.method = "POST";
        let product = {
            name: generateRandomString()
        }

        req.body = { ...product };

        await addProductBrandApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.productBrand.findUnique({
            where: {
                name: product.name
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(product);
    })

    it("fails to save brand due to duplicate name", async() => {
        let product = { name: generateRandomString() };

        await prismaClient.productBrand.create({ data: { ...product } });
        req.method = "POST";
        req.body = { name: product.name };

        await addProductBrandApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`name`)");
    })

    it("fails on missing required fields", async() => {  

        req.body = {};
        req.method = "POST";
        await addProductBrandApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Some required fields are missing. Please check the data sent and try again");
    })
})