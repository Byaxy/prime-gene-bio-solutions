import HttpMocks from "node-mocks-http";
import { IProductBrand, generateRandomString, seedMockBarcodeSymbologies } from "@/utils";
import barcodeSymbologyApi from "@/pages/api/barcode-symbology/[id]";
import prismaClient from "@/utils/prisma-client";

describe("tests api/barcode-symbology/id route", () => {
    let req: any;
    let res: any;
    let barcodeSymbology: IProductBrand;
    let barcodeSymbologyId: string;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        barcodeSymbology = await seedMockBarcodeSymbologies(1) as IProductBrand;
        barcodeSymbologyId = (await prismaClient.barcodeSymbology.findUnique({ where: { name: barcodeSymbology.name } }))?.id as string;
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.barcodeSymbology.deleteMany();
    })

    it("only accepts GET, PUT or DELETE requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("returns 400 if barcode-symbology ID is not in route", async() => {
        req.method = "GET";
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET barcode-symbology is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches barcode-symbology by Id", async() => {
        req.method = "GET";
        req.query = { id: barcodeSymbologyId };
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toMatchObject({ 
            name: barcodeSymbology.name,
        });
    })

    it("does not update barcode-symbology if req.body has fields missing from barcode-symbology model", async () => {
        req.method = "PUT";
        req.query = { id: barcodeSymbologyId };
        req.body = {};
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        const olderVersion = await prismaClient.barcodeSymbology.findUnique({ where: { id: barcodeSymbologyId } }) as IProductBrand;
        expect({
            id: barcodeSymbologyId,
            name: barcodeSymbology.name,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toMatchObject(olderVersion);
    })

    it("ignore extra fields not in barcode-symbology model", async() => {
        req.method = "PUT";
        req.query = { id: barcodeSymbologyId };
        req.body = { field: "test" };
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
        const olderVersion = await prismaClient.barcodeSymbology.findUnique({ where: { id: barcodeSymbologyId } }) as IProductBrand;
        expect({
            id: barcodeSymbologyId,
            name: barcodeSymbology.name,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("updates a barcode-symbology", async() => {
        req.method = "PUT";
        req.query = { id: barcodeSymbologyId };
        let changes = {
            name: generateRandomString(),
        };
        req.body = { ...changes };
        await barcodeSymbologyApi(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        
        const newBrand = await prismaClient.barcodeSymbology.findUnique({ where: { name: changes.name } });

        expect(newBrand).toBeDefined();
        expect({ ...changes }).toEqual({ 
            name: newBrand?.name,
        });
    })

    it("returns 404 if no product to delete", async() => {
        req.method = "DELETE";
        req.query = { id: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }

        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe("Not Found");
    })

    it("deletes a product", async() => {
        req.method = "DELETE";
        req.query = { id: barcodeSymbologyId }

        await barcodeSymbologyApi(req, res);
        const result = await prismaClient.barcodeSymbology.findUnique({ where: { id: barcodeSymbologyId } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect(result?.isActive).toBe(false);
    })
})