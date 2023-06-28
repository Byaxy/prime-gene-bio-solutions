import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";

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
                    barcodeSymbology: { select: { name: true } }
                }
            });
            if (!result) return res.writeHead(404, statusMessages[404]).end();
            return res.status(200).json(result);
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "GET, PUT" }).end();
    }
}