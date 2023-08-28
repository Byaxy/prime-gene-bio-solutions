import { statusMessages, uploadImagesToCloudinary } from "@/utils";
import prismaClient from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import formidable from "formidable";

// Disable bodyParser as multipart/form-data is expect instead of json
// See https://nextjs.org/docs/pages/building-your-application/routing/api-routes#custom-config
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    // Only allow test environment to work without session because of unit tests
    if(!session && process.env.NODE_ENV !== "test") return res.writeHead(403, statusMessages[403]).end();

    switch(req.method) {
        case "POST":
            try {
                const form = formidable({});
                let [fields, files] = await form.parse(req);
                const { createdAt, ...body } = JSON.parse(fields.json[0]);

                const category: any = {
                    name: body.name,
                    code: body.code,
                    description: body.description,
                    parentCategoryId: body.parentCategory
                };

                if (files["image"]) {
                    category.image = await uploadImagesToCloudinary(files["image"][0].filepath) as string;
                }

                console.log(category);
                const result = await prismaClient.productBrand.create({
                    data: category
                });
                res.statusMessage = statusMessages[201];
                return res.status(201).json(result);
            } catch(e) {
                if(e instanceof Prisma.PrismaClientValidationError) {
                    // Missing required fields are missing. See https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror
                    return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end("Some required fields are missing. Please check the data sent and try again");
                } else if(e instanceof Prisma.PrismaClientKnownRequestError) {
                    // Unique constraint failed. See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
                    if(e.code === "P2002") {
                        let lines = e.message.split("\n");
                        return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end(lines.at(-1));
                    }
                }
                return res.status(500).end();
            }
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "POST" }).end();
    }
}