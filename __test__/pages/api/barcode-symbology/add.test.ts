import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import addBarcodeSymbologyApi from "@/pages/api/barcode-symbology/add";
import { generateRandomString } from "@/utils";

describe("tests the api/barcode-symbology/add route", () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    afterAll(async() => {
        // Clear DB
        await prismaClient.barcodeSymbology.deleteMany();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await addBarcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST");
    })

    it("inserts a brand in the database", async() => {
        req.method = "POST";
        let barcode = {
            name: generateRandomString()
        }

        req.body = { ...barcode };

        await addBarcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.barcodeSymbology.findUnique({
            where: {
                name: barcode.name
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(barcode);
    })

    it("fails to save barcode symbology due to duplicate name", async() => {
        let barcode = { name: generateRandomString() };

        await prismaClient.barcodeSymbology.create({ data: { ...barcode } });
        req.method = "POST";
        req.body = { name: barcode.name };

        await addBarcodeSymbologyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`name`)");
    })

    it("fails on missing required fields", async() => {  

        req.body = {};
        req.method = "POST";
        await addBarcodeSymbologyApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Some required fields are missing. Please check the data sent and try again");
    })
})