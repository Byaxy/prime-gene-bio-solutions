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
            // Get all items. See https://www.prisma.io/docs/concepts/components/prisma-client/crud#get-all-records
            const result = await prismaClient.unitOfMeasure.findMany({
                where: {
                    isActive: req.query.isActive === "false" ? false : true
                }
            });
            return res.status(200).json(result);
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "GET" }).end();
    }
}