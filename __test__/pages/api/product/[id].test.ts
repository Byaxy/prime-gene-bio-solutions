import HttpMocks from "node-mocks-http";
import { cleanUpMockProducts, generateRandomString, seedMockProducts } from "@/utils";
import productApi from "@/pages/api/product/[id]";
import prismaClient from "@/utils/prisma-client";
import { Product } from "@prisma/client";

describe("tests api/product/id route", () => {
    let req: any;
    let res: any;
    let product: Product;
    let productId: string;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        product = (await seedMockProducts(1))[0];
        productId = (await prismaClient.product.findUnique({ where: { code: product.code } }))?.id as string;
    })

    afterAll(async () => {
        // Clear DB
        await cleanUpMockProducts();
    })

    it("only accepts GET, PUT or DELETE requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("returns 400 if product ID is not in route", async() => {
        req.method = "GET";
        await productApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET product is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await productApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches product by Id", async() => {
        req.method = "GET";
        const queryResult = await prismaClient.product.findFirst({ where: { name: product.name } });
        req.query = { id: queryResult?.id };
        await productApi(req, res);
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

    it("does not update product if req.body has no matching product fields", async () => {
        req.method = "PUT";
        req.query = { id: productId };
        req.body = {};
        await productApi(req, res);
        const newProduct = await prismaClient.product.findUnique({ where: { id: productId } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect({ 
            ...product,
            id: productId, 
            createdAt: newProduct?.createdAt, 
            updatedAt: newProduct?.updatedAt,
        }).toEqual(newProduct);
    })

    it("ignore extra fields not in product model", async() => {
        req.method = "PUT";
        req.query = { id: productId };
        req.body = { field: "test" };
        await productApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
        const olderVersion = await prismaClient.product.findUnique({ where: { id: productId } });
        expect({
            ...product,
            id: productId,
            createdAt: olderVersion?.createdAt,
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("updates a product", async() => {
        req.method = "PUT";
        req.query = { id: productId };
        let changes = {
            name: generateRandomString(),
            code: generateRandomString(),
            cost: 3,
            price: 5,
            quantity: 10,
            alertQuantity: 1,
        };
        req.body = { ...changes };
        await productApi(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        
        const newProduct = await prismaClient.product.findUnique({ where: { code: changes.code } });

        expect(newProduct).toBeDefined();
        expect({ ...changes }).toEqual({ 
            name: newProduct?.name,
            code: newProduct?.code,
            cost: newProduct?.cost,
            price: newProduct?.price,
            quantity: newProduct?.quantity,
            alertQuantity: newProduct?.alertQuantity,
        });
    })

    it("fails on invalid product type", async () => {
        req.method = "PUT";
        req.body = { productTypeId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }
        req.query = { id: productId };

        await productApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid product category", async () => {
        req.method = "PUT";
        req.body = { productCategoryId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }
        req.query = { id: productId };

        await productApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid unit of measure", async () => {
        req.method = "PUT";
        req.body = { unitOfMeasureId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }
        req.query = { id: productId };

        await productApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid barcode symbology", async () => {
        req.method = "PUT";
        req.body = { barcodeSymbologyId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }
        req.query = { id: productId };

        await productApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("fails on invalid product brand", async () => {
        req.method = "PUT";
        req.body = { productBrandId: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }
        req.query = { id: productId };

        await productApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid dependent item");
    })

    it("returns 404 if no product to delete", async() => {
        req.method = "DELETE";
        req.query = { id: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }

        await productApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe("Not Found");
    })

    it("deletes a product", async() => {
        req.method = "DELETE";
        req.query = { id: productId }

        await productApi(req, res);
        const result = await prismaClient.product.findUnique({ where: { id: productId } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect(result?.isActive).toBe(false);
    })
})