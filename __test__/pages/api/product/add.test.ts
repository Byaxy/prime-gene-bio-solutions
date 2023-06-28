import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import addProductApi from "@/pages/api/product/add";
import { cleanUpMockProducts, seedProductForeignKeys } from "@/utils";

describe("tests the api/product/add route", () => {
    let baseProduct: {[key: string]: any};
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        baseProduct = {
            ...(await seedProductForeignKeys())
        };
    })

    afterAll(async() => {
        // Clear DB
        await cleanUpMockProducts()
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await addProductApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST");
    })

    it("inserts an item in the database", async() => {
        let product = {
            code: "PDT-1",
            name: "Product 1",
            cost: 10,
            price: 24,
            quantity: 5,
            alertQuantity: 3,
            ...baseProduct
        }

        req.body = {...product};
        req.method = "POST";

        await addProductApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.product.findUnique({
            where: {
                code: product.code
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(product);
    })

    it("cleans data before saving", async() => {
        let product = {
            code: "PDT-2",
            name: "Product 2",
            cost: -10,
            price: -24,
            quantity: -5,
            alertQuantity: -3,
            ...baseProduct
        }

        req.body = { ...product };
        req.method = "POST";

        await addProductApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.product.findUnique({
            where: {
                code: product.code
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject({
            ...product,
            cost: 0,
            price: 0,
            quantity: 0,
            alertQuantity: 0
        });
    })

    it("fails on missing required fields", async() => {  

        req.body = {};
        req.method = "POST";
        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Some required fields are missing. Please check the data sent and try again");
    })

    it("fails on invalid product brand", async () => {
        req.method = "POST";
        req.body = {
            code: "PDT-3",
            name: "Product 3",
            cost: 10,
            price: 20,
            quantity: 30,
            alertQuantity: 40,
            ...baseProduct,
            productBrandId: "5083d173-d2f0-48a3-9c3b-f0a9c12d4503",   
        }

        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid product type", async () => {
        req.method = "POST";
        req.body = {
            code: "PDT-3",
            name: "Product 3",
            cost: 10,
            price: 20,
            quantity: 30,
            alertQuantity: 40,
            ...baseProduct,
            productTypeId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0",   
        }

        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid product category", async() => {
        req.method = "POST";
        req.body = {
            code: "PDT-3",
            name: "Product 3",
            cost: 10,
            price: 20,
            quantity: 30,
            alertQuantity: 40,
            ...baseProduct,
            productCategoryId: "d9f81eda-2cf6-4f18-b9b7-0dfc40b2f93c",
        }

        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");        
    })

    it("fails on invalid barcode symbology", async() => {
        req.method = "POST";
        req.body = {
            code: "PDT-3",
            name: "Product 3",
            cost: 10,
            price: 20,
            quantity: 30,
            alertQuantity: 40,
            ...baseProduct,
            barcodeSymbologyId: "97016496-6c53-4b14-8ecd-cad638463b11",
        }

        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid unit of measure", async() => {
        req.method = "POST";
        req.body = {
            code: "PDT-3",
            name: "Product 3",
            cost: 10,
            price: 20,
            quantity: 30,
            alertQuantity: 40,
            ...baseProduct,
            unitOfMeasureId: "1542121d-89b9-42a1-989e-0b41f01cb853"
        }

        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })
})