import { Client, Databases, Query } from "appwrite";
import config from "../conf/conf";
import display from "../display";

class Service {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_project_id);
    this.database = new Databases(this.client);
  }

  // database
  async addMeal({ mealId, title, featuredImage, userId }) {
    try {
      return await this.database.createDocument(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        `${userId}-${mealId}`,
        {
          mealId,
          title,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      throw (error.message);
    }
  }

  async getMealsList(userId) {
    try {
      return await this.database.listDocuments(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async getMeal(id) {
    try {
      return await this.database.getDocument(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        id
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMeal(id) {
    try {
      await this.database.deleteDocument(
        config.appwrite_database_id,
        config.appwrite_collection_id,
        id
      );
      return true;
    } catch (error) {
      display(error.message);
      return false;
    }
  }
}

const service = new Service();

export default service;
