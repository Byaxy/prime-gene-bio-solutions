import { statusMessages } from "@/utils";
import prismaClient from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { unlink } from 'fs/promises';

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
                const body = JSON.parse(fields.product[0]);
                const product = {
                    ...body,
                    cost: Math.max(body.cost, 0),
                    price: Math.max(body.price, 0),
                    quantity: Math.max(body.quantity, 0),
                    alertQuantity: Math.max(body.alertQuantity, 0),
                    images: [],
                    isActive: true
                };
                if (files["product-main-img"]) {
                    // First image will always be the main product image
                    const img = await cloudinary.uploader.upload(files["product-main-img"][0].filepath);
                    product.images.push(img.secure_url);
                }
                const cloudinaryResponse = await Promise.all(
                    Object.keys(files).map(file => {
                        if (file !== "product-main-img") return cloudinary.uploader.upload(files[file][0].filepath);
                    }).filter(o => o !== undefined)
                );

                product.images = [
                    product.images[0],
                    ...cloudinaryResponse.map(result => result?.secure_url)
                ];

                console.log(product);
                
                const response = await prismaClient.product.create({
                    data: { ...product }
                });
                // Delete the images from file system
                await Promise.all(
                    Object.keys(files).map(key => unlink(files[key][0].filepath))
                );
                res.statusMessage = statusMessages[201];
                return res.status(201).json(response);
            } catch(e) {
                if(e instanceof Prisma.PrismaClientValidationError) {
                    // Missing required fields are missing. See https://www.prisma.io/docs/reference/api-reference/error-reference#prismaclientvalidationerror
                    return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end("Some required fields are missing. Please check the data sent and try again");
                } else if(e instanceof Prisma.PrismaClientKnownRequestError) {
                    // Unique constraint failed. See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
                    if(e.code === "P2002") {
                        let lines = e.message.split("\n");
                        return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end(lines.at(-1));
                    } else if(e.code === "P2003") {
                        // Provided foreign key not in DB. See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
                        return res.writeHead(400, statusMessages[400], { "Content-Type": "text/plain" }).end("Invalid dependent item");
                    }
                }
                return res.status(500).end();
            }
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "POST" }).end();
    }
}