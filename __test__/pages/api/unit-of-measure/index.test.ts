import HttpMocks from "node-mocks-http";
import { seedMockUnitOfMeasures } from "@/utils";
import unitOfMeasureApi from "@/pages/api/unit-of-measure";
import prismaClient from "@/utils/prisma-client";
import { UnitOfMeasure } from "@prisma/client";

describe("tests api/unit-of-measure/index route", () => {
    let req: any;
    let res: any;
    let unitOfMeasure: UnitOfMeasure[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        // Mock data
        unitOfMeasure = await seedMockUnitOfMeasures(3);
    })

    afterAll(async () => {
        // Clear DB
        await prismaClient.unitOfMeasure.deleteMany();
    })

    it("only accepts GET requests", async() => {
        req.method = "POST";
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET");
    })

    it("fetches archived unit-of-measure", async() => {
        // Archive an item
        await prismaClient.unitOfMeasure.update({ 
            where: { 
                name: unitOfMeasure[0].name
            },
            data: {
                isActive: false
            }
        })

        req.method = "GET";
        req.query = { isActive: "false" };
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(1);        
    })

    it("fetches active unit-of-measure by default", async() => {
        req.method = "GET";
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(2);
    })
})

describe("tests api/unit-of-measure/index route if table is empty", () => {
    let req: any = HttpMocks.createRequest();
    let res: any = HttpMocks.createResponse();

    it("returns empty array if no unit-of-measure", async() => {
        req.method = "GET";
        await unitOfMeasureApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(res._getJSONData()).toBeDefined();
        expect(res._getJSONData()).toHaveLength(0);
    })
})