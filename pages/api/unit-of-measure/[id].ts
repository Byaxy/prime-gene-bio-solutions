import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";
import { Prisma } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    // Only allow test environment to work without session because of unit tests
    if(!session && process.env.NODE_ENV !== "test") return res.writeHead(403, statusMessages[403]).end();

    const { id } = req.query;

    if(!id) return res.writeHead(400, statusMessages[400]).end();

    switch(req.method) {
        case "GET":
            const result = await prismaClient.unitOfMeasure.findUnique({
                where: {
                    id: req.query.id as string
                }
            });
            if (!result) return res.writeHead(404, statusMessages[404]).end();
            return res.status(200).json(result);
        case "PUT":
            try {
                await prismaClient.unitOfMeasure.update({
                    where: {
                        id: id as string
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
                }
                return res.status(500).end();
            }
        case "DELETE":
            try {
                await prismaClient.unitOfMeasure.update({ 
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