import { config } from "@/config/config";
import { Client, Account, ID, Databases } from "appwrite";

const appwriteClient = new Client();

export const DB = new Databases(appwriteClient);

type CreateUserAccount = {
  name: string;
  email: string;
  password: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

export class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(appwriteClient);
  }

  //create a new record of user inside appwrite
  async createUserAccount({ name, email, password }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.account.createEmailPasswordSession(email, password);
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {}

    return false;
  }

  async getCurrentUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log("getcurrentUser error: " + error);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("logout error: " + error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
