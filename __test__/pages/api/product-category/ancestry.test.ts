import { seedMockProductCategories } from "@/utils";
import prismaClient from "@/utils/prisma-client";
import HttpMocks from "node-mocks-http";
import productCategoriesAncestryApi from "@/pages/api/product-category/ancestry";
import { ProductCategory } from "@prisma/client";

describe("tests the /api/product-category/ancestry api route", () => {
    let req: any;
    let res: any;
    let categories: ProductCategory[];

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    beforeAll(async () => {
        const lvl0 = (await seedMockProductCategories())[0];
        const lvl1 = (await seedMockProductCategories(1, lvl0.id))[0];
        const lvl2 = (await seedMockProductCategories(1, lvl1.id))[0];
        const lvl3 = (await seedMockProductCategories(1, lvl2.id))[0];
        const lvl4 = (await seedMockProductCategories(1, lvl3.id))[0];

        categories = [lvl4, lvl3, lvl2, lvl1, lvl0];
    })

    afterAll(async() => {
        await prismaClient.productCategory.deleteMany();
    })

    it("gets all the product categories ancestry tree", async() => {
        await(productCategoriesAncestryApi(req, res));
        const response = res._getJSONData();
        expect(response).toEqual([
            {
                id: categories[0].id,
                ancestry: `${categories[0].name} > ${categories[1].name} > ${categories[2].name} > ${categories[3].name} > ${categories[4].name}`
            },
            {
                id: categories[1].id,
                ancestry: `${categories[1].name} > ${categories[2].name} > ${categories[3].name} > ${categories[4].name}`
            },
            {
                id: categories[2].id,
                ancestry: `${categories[2].name} > ${categories[3].name} > ${categories[4].name}`
            },
            {
                id: categories[3].id,
                ancestry: `${categories[3].name} > ${categories[4].name}`
            },
            {
                id: categories[4].id,
                ancestry: `${categories[4].name}`
            }
        ]);
    })
})