import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";

export const options = {
    providers: [
        EmailProvider({
            
        })
    ]
}

export default NextAuth(options);