import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    // Only allow test environment to work without session because of unit tests
    if(!session && process.env.NODE_ENV !== "test") return res.writeHead(403, statusMessages[403]).end();

    switch(req.method) {
        case "GET":
            // Get product and related fields. See https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#select-specific-relation-fields
            const result = await prismaClient.product.findMany({
                where: {
                    isActive: req.query.isActive === "false" ? false : true
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
                }
            });
            return res.status(200).json(result);
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "GET" }).end();
    }
}