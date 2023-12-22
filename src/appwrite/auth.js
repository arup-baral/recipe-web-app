import { Client, Account, ID } from "appwrite";
import config from "../conf/conf";
import display from "../display";

class Authentication {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_project_id);
    this.account = new Account(this.client);
  }

  async createUser({email, password, name}) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if(userAccount) {
            display("Account successfully created✅");
            return this.logIn({email, password});
        }
        else {
            display("Account creation failed!!!❌");
            return null;
        }
    } catch (error) {
        display(error.message);
    }
  }

  async logIn({email, password}) {
    try {
        return await this.account.createEmailSession(email, password);
    } catch (error) {
        display(error.message);
    }
  }

  async logOut() {
    try {
        await this.account.deleteSession('current');
    } catch (error) {
        display(error.message);
    }
  }

  async getUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log(error.message);
    }
  }
}

const auth = new Authentication();

export default auth;