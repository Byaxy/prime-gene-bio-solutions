import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prismaClient from "@/utils/prisma-client";
import { comparePassword } from "@/utils";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", required: true },
              password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials, req) {
                const user = await prismaClient.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });
                if (user && (await comparePassword(credentials?.password, user.password))) {
                    // Any object returned will be saved in `user` property of the JWT
                    return { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname }
                } 
                // If you return null then an error will be displayed advising the user to check their details.
                return null
            }
        })
    ]
}

export default NextAuth(authOptions);