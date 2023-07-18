import HttpMocks from "node-mocks-http";
import { generateRandomString, seedMockUnitOfMeasures } from "@/utils";
import unitOfMeasureApi from "@/pages/api/unit-of-measure/[id]";
import prismaClient from "@/utils/prisma-client";
import { UnitOfMeasure } from "@prisma/client";

describe("tests api/unit-of-measure/id route", () => {
    let req: any;
    let res: any;
    let unitOfMeasure: UnitOfMeasure;
    let unitOfMeasureId: string;

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        unitOfMeasure = (await seedMockUnitOfMeasures(1))[0];
        unitOfMeasureId = (await prismaClient.unitOfMeasure.findUnique({ where: { name: unitOfMeasure.name } }))?.id as string;
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.unitOfMeasure.deleteMany();
    })

    it("only accepts GET, PUT or DELETE requests", async() => {
        req.method = "POST";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("returns 400 if unit-of-measure ID is not in route", async() => {
        req.method = "GET";
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("returns 404 if GET unit-of-measure is not found", async() => {
        req.method = "GET";
        req.query = { id: "efb3b969-6225-440c-9f82-1bf7877b9d96" };
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fetches unit-of-measure by Id", async() => {
        req.method = "GET";
        req.query = { id: unitOfMeasureId };
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toMatchObject({ 
            name: unitOfMeasure.name,
        });
    })

    it("does not update unit-of-measure if req.body has fields missing from unit-of-measure model", async () => {
        req.method = "PUT";
        req.query = { id: unitOfMeasureId };
        req.body = {};
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        const olderVersion = await prismaClient.unitOfMeasure.findUnique({ where: { id: unitOfMeasureId } });
        expect({
            id: unitOfMeasureId,
            name: unitOfMeasure.name,
            code: unitOfMeasure.code,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("ignore extra fields not in unit-of-measure model", async() => {
        req.method = "PUT";
        req.query = { id: unitOfMeasureId };
        req.body = { field: "test" };
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toBe("Bad Request");
        expect(res._getData()).toEqual("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
        const olderVersion = await prismaClient.unitOfMeasure.findUnique({ where: { id: unitOfMeasureId } });
        expect({
            id: unitOfMeasureId,
            name: unitOfMeasure.name,
            code: unitOfMeasure.code,
            isActive: true,
            createdAt: olderVersion?.createdAt, 
            updatedAt: olderVersion?.updatedAt,
        }).toEqual(olderVersion);
    })

    it("updates a unit-of-measure", async() => {
        req.method = "PUT";
        req.query = { id: unitOfMeasureId };
        let changes = {
            name: generateRandomString(),
        };
        req.body = { ...changes };
        await unitOfMeasureApi(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        
        const newBrand = await prismaClient.unitOfMeasure.findUnique({ where: { name: changes.name } });

        expect(newBrand).toBeDefined();
        expect({ ...changes }).toEqual({ 
            name: newBrand?.name,
        });
    })

    it("returns 404 if no product to delete", async() => {
        req.method = "DELETE";
        req.query = { id: "a295438e-58a6-4fa7-8cc1-70af34a3b8c0" }

        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toBe("Not Found");
    })

    it("deletes a product", async() => {
        req.method = "DELETE";
        req.query = { id: unitOfMeasureId }

        await unitOfMeasureApi(req, res);
        const result = await prismaClient.unitOfMeasure.findUnique({ where: { id: unitOfMeasureId } });
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toBe("OK");
        expect(result?.isActive).toBe(false);
    })
})