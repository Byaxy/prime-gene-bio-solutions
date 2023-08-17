import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";

/**
 * Gets the ancestry tree of all product categories
 * @param req Request object
 * @param res Response object
 * @returns Http response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    // Only allow test environment to work without session because of unit tests
    if(!session && process.env.NODE_ENV !== "test") return res.writeHead(403, statusMessages[403]).end();

    switch(req.method) {
        case 'GET':
            const result = await prismaClient.productCategory.findMany({
                orderBy: [
                    {
                        createdAt: "desc"
                    }
                ],
                select: {
                    name: true,
                    id: true,
                    parentCategoryId: true
                }
            });

            const categories = [];
            const cache: { [key: string]: string } = {};

            for (let i = 0; i < result.length; i++) {
                const current = result[i];
                if (!cache[current.name]) getPath(result, cache, i);
                categories.push({ id: current.id, ancestry: cache[current.name] });
            }

            return res.status(200).json(categories);
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "GET" }).end();
    }
}

function getPath(
    categories: { id: string, name: string, parentCategoryId: string | null}[], 
    cache: {[key: string]: string}, 
    start: number
) {
    let path: string[] = [categories[start].name];
    let curr = start;

    for (let i = start + 1; i < categories.length && categories[curr].parentCategoryId !== null; i++) {
        if (categories[i].id === categories[curr].parentCategoryId) {
            path.push(categories[i].name);
            curr = i;
        }
    }

    // if(curr !== start)  path.push(categories[curr].name);

    for (let i = 0; i < path.length; i++) {
        cache[path[i]] = path.slice(i).join(" > ");
    }
}