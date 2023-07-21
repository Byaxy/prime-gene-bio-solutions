import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getProductCategoryBreadcrumb, statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";
import { Prisma } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    // Only allow test environment to work without session because of unit tests
    if(!session && process.env.NODE_ENV !== "test") return res.writeHead(403, statusMessages[403]).end();

    if(!req.query.id) return res.writeHead(400, statusMessages[400]).end();

    switch(req.method) {
        case "GET":
            // Get product and related fields. See https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#select-specific-relation-fields
            const result = await prismaClient.product.findUnique({
                where: {
                    id: req.query.id as string
                },
                select: {
                    images: true,
                    code: true,
                    name: true,
                    cost: true,
                    price: true,
                    quantity: true,
                    alertQuantity: true,
                    productBrand: { select: { name: true } },
                    productCategory: { select: { name: true } },
                    unitOfMeasure: { select: { name: true } },
                    productType: { select: { name: true } },
                    productCategoryId: true
                }
            });
            if (!result) return res.writeHead(404, statusMessages[404]).end();
            const breadcrumbs = await getProductCategoryBreadcrumb(result.productCategoryId);
            let { productCategoryId, ...rest } = result;
            return res.status(200).json({ ...rest, breadcrumbs });
        case "PUT":
            try {
                await prismaClient.product.update({
                    where: {
                        id: req.query.id as string
                    },
                    data: {
                        ...req.body
                    }
                });

                return res.status(200).end();
            } catch(e) {
                if (e instanceof Prisma.PrismaClientValidationError) {
                    // User tried to send a key in JSON but the key is not in the DB model e.g
                    // { fieldA: "valueA" } will fail because the ProductModel does not have a
                    // field called fieldA
                    return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end("Invalid key found in the JSON object sent. Please refer to the spec and try again!");
                } else if(e instanceof Prisma.PrismaClientKnownRequestError) {
                    if(e.code === "P2003") {
                        return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end("Invalid dependent item");
                    }
                }
                return res.status(500).end();
            }
        case "DELETE":
            try {
                const deleteResult = await prismaClient.product.update({ 
                    where: { 
                        id: req.query.id as string 
                    },
                    data: {
                        isActive: false
                    } 
                });
                return res.status(200).end();
            } catch(e) {
                if(e instanceof Prisma.PrismaClientKnownRequestError) {
                    // Error thrown if item to be deleted is not found
                    // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
                    if(e.code === "P2025") return res.writeHead(404, statusMessages[404]).end();
                }
                return res.status(500).end();
            }
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "GET, PUT, DELETE" }).end();
    }
}