import HttpMocks from "node-mocks-http";
import { seedMockBarcodeSymbologies } from "@/utils";
import barcodeSymbologyApi from "@/pages/api/barcode-symbology";
import prismaClient from "@/utils/prisma-client";
import { BarcodeSymbology } from "@prisma/client";

describe("tests api/barcode-symbology/index route", () => {
    let req: any;
    let res: any;
    let barcodes: BarcodeSymbology[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        barcodes = await seedMockBarcodeSymbologies(3);
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.barcodeSymbology.deleteMany();
    })

    it("only accepts GET requests", async() => {
        req.method = "POST";
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET");
    })

    it("fetches archived barcodes", async() => {
        // Archive an item
        await prismaClient.barcodeSymbology.update({ 
            where: { 
                name: barcodes[0].name
            },
            data: {
                isActive: false
            }
        })

        req.method = "GET";
        req.query = { isActive: "false" };
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(1);        
    })

    it("fetches active barcodes by default", async() => {
        req.method = "GET";
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(2);
    })
})

describe("tests api/barcode-symbology/index route if table is empty", () => {
    let req: any = HttpMocks.createRequest();
    let res: any = HttpMocks.createResponse();

    it("returns empty array if no barcodes", async() => {
        req.method = "GET";
        await barcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})