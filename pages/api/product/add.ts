import { statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    // Only allow test environment to work without session because of unit tests
    if(!session && process.env.NODE_ENV !== "test") return res.writeHead(403, statusMessages[403]).end();

    switch(req.method) {
        case "POST":
            try {
                const response = await prismaClient.product.create({
                    data: {
                        ...req.body,
                        cost: Math.max(req.body.cost, 0),
                        price: Math.max(req.body.price, 0),
                        quantity: Math.max(req.body.quantity, 0),
                        alertQuantity: Math.max(req.body.alertQuantity, 0),
                        isActive: true
                    }
                });
    
                res.statusMessage = statusMessages[201];
                return res.status(201).json(response);
            } catch(e) {
                if(e instanceof Prisma.PrismaClientValidationError) {
                    // Missing required fields are missing. See https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror
                    return res.writeHead(400, statusMessages[400]).send("Some required fields are missing. Please check the data sent and try again");
                } else if(e instanceof Prisma.PrismaClientKnownRequestError) {
                    // Unique constraint failed. See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
                    if(e.code === "P2002") {
                        let lines = e.message.split("\n");
                        return res.writeHead(400, statusMessages[400]).send(lines.at(-1));
                    } else if(e.code === "P2003") {
                        // Provided foreign key not in DB. See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
                        return res.writeHead(400, statusMessages[400]).send("Invalid dependent item");
                    }
                }
                return res.status(500).end();
            }
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "POST" }).end();
    }
}