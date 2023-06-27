import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import addProductApi from "@/pages/api/product/add";

describe("tests the api/product/add route", () => {
    let productTypeId: string,
    unitOfMeasureId: string,
    productBrandId: string,
    productCategoryId: string,
    barcodeSymbologyId: string,
    baseProduct: {[key: string]: any};

    beforeAll(async () => {
        // Populate DB
        productTypeId = (await prismaClient.productType.create({ data: { name: "TypeA" } })).id;
        unitOfMeasureId = (await prismaClient.unitOfMeasure.create({ data: { name: "Pieces" } })).id;
        productBrandId = (await prismaClient.productBrand.create({ data: { name: "Super" } })).id;
        productCategoryId = (await prismaClient.productCategory.create({ data: { name: "CategoryA" } })).id;
        barcodeSymbologyId = (await prismaClient.barcodeSymbology.create({ data: { name: "UPC-A" } })).id;
        // Mock data
        baseProduct = {
            productTypeId,
            unitOfMeasureId,
            productBrandId,
            productCategoryId,
            barcodeSymbologyId
        }
    })

    afterAll(async() => {
        // Clear DB
        await prismaClient.product.deleteMany();
        await prismaClient.productType.deleteMany();
        await prismaClient.unitOfMeasure.deleteMany();
        await prismaClient.productBrand.deleteMany();
        await prismaClient.productCategory.deleteMany();
        await prismaClient.barcodeSymbology.deleteMany();
    })

    it("tests allowed methods", async () => {
        let req = HttpMocks.createRequest();
        let res = HttpMocks.createResponse();
        req.method = "HEAD";
        await addProductApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST");
    })

    it("inserts an item in the database", async() => {
        let req = HttpMocks.createRequest();
        let res = HttpMocks.createResponse();
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
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");

        let result = await prismaClient.product.findUnique({
            where: {
                code: product.code
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(product);
    })

    it("cleans data before saving", async() => {
        let req = HttpMocks.createRequest();
        let res = HttpMocks.createResponse();
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
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");

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
        let req = HttpMocks.createRequest();
        let res = HttpMocks.createResponse();  

        req.body = {};
        req.method = "POST";
        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Some required fields are missing. Please check the data sent and try again");
    })

    it("fails on invalid foreign keys", async () => {
        let req = HttpMocks.createRequest();
        let res = HttpMocks.createResponse();
        let product = {
            code: "PDT-3",
            name: "Product 3",
            cost: 10,
            price: 20,
            quantity: 30,
            alertQuantity: 40,
            productBrandId: "5083d173-d2f0-48a3-9c3b-f0a9c12d4503",
            productTypeId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0",
            productCategoryId: "d9f81eda-2cf6-4f18-b9b7-0dfc40b2f93c",
            barcodeSymbologyId: "97016496-6c53-4b14-8ecd-cad638463b11",
            unitOfMeasureId: "1542121d-89b9-42a1-989e-0b41f01cb853"
        }

        req.body = { ...product };
        req.method = "POST";

        await addProductApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })
})