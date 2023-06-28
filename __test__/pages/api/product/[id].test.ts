import HttpMocks from "node-mocks-http";
import { IProduct, cleanUpMockProducts, seedMockProducts } from "@/utils";
import getProductApi from "@/pages/api/product/[id]";
import prismaClient from "@/utils/prisma-client";

describe("tests api/product/id route", () => {
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

    it("only accepts GET or PUT requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await getProductApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT");
    })

    it("returns 400 if product ID is not in route", async() => {
        req.method = "GET";
        await getProductApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET product is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await getProductApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches product by Id", async() => {
        req.method = "GET";
        // Mock data
        const product = await seedMockProducts(1) as IProduct;
        const queryResult = await prismaClient.product.findFirst({ where: { name: product.name } });
        req.query = { id: queryResult?.id };
        await getProductApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toEqual({ 
            code: product.code,
            name: product.name,
            cost: product.cost,
            price: product.price,
            quantity: product.quantity,
            alertQuantity: product.alertQuantity,
            images: [],
            productType: { name: "TypeA" },
            unitOfMeasure: { name: "Pieces" },
            productCategory: { name: "CategoryA" },
            productBrand: { name: "Super" },
            barcodeSymbology: { name: "UPC-A" }
        });
    })
})