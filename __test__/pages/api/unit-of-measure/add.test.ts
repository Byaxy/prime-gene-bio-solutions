import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import addUnitOfMeasureApi from "@/pages/api/unit-of-measure/add";
import { generateRandomString } from "@/utils";

describe("tests the api/unit-of-measure/add route", () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    afterAll(async() => {
        // Clear DB
        await prismaClient.unitOfMeasure.deleteMany();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await addUnitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST");
    })

    it("inserts a brand in the database", async() => {
        req.method = "POST";
        let product = {
            name: generateRandomString(),
            code: generateRandomString()
        }

        req.body = { ...product };

        await addUnitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");

        let result = await prismaClient.unitOfMeasure.findUnique({
            where: {
                name: product.name
            }
        });

        expect(result).toBeDefined();
        expect(result).toMatchObject(product);
    })

    it("fails to save unit of measure due to duplicate name", async() => {
        let uom = { name: generateRandomString(), code: generateRandomString() };

        await prismaClient.unitOfMeasure.create({ data: { ...uom } });
        req.method = "POST";
        req.body = { name: uom.name, code: generateRandomString() };

        await addUnitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`name`)");
    })

    it("fails to save unit of measure due to duplicate code", async() => {
        let uom = { name: generateRandomString(), code: generateRandomString() };

        await prismaClient.unitOfMeasure.create({ data: { ...uom } });
        req.method = "POST";
        req.body = { name: generateRandomString(), code: uom.code };

        await addUnitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getData()).toEqual("Unique constraint failed on the fields: (`code`)");
    })

    it("fails on missing required fields", async() => {  

        req.body = {};
        req.method = "POST";
        await addUnitOfMeasureApi(req, res);

        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Some required fields are missing. Please check the data sent and try again");
    })
})