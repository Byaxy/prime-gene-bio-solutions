import { config } from "@/config/config";
import { Client, Account, ID } from "appwrite";
import type { User } from "@/components/Types";

const appwriteClient = new Client();

appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient);


export class AppwriteService {
    //create a new record of user inside appwrite
    async createUserAccount(user: User) {
        try {
            const userAccount = await account.create(user.id = ID.unique(), user.email, user.password, user.firstName)
            if (userAccount) {
                return this.login({email: user.email, password: user.password})
            } else {
                return userAccount
            }    
        } catch (error:any) {
            throw error
        }

    
    }

    async login( { email, password }: {email: string, password: string}) {
       try {
            return await account.createEmailPasswordSession(email, password)
       } catch (error:any) {
         throw error
       }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) {}

        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.log("getcurrentUser error: " + error)
            
        }

        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }

    
}

const appwriteService = new AppwriteService()

export default appwriteService