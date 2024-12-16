import conf from '../conf/conf.js';
import { Client, Databases } from "appwrite";

class Service {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ name, unique_id, last_year_amount, this_year_amount, email, id }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    name,
                    unique_id,
                    last_year_amount,
                    this_year_amount,
                    email,
                }
            );
        } catch (error) {
            console.log("BudgetService :: createBudget :: error", error);
        }
    }

    async updatePost(id, { name, unique_id, last_year_amount, this_year_amount, email }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    name,
                    unique_id,
                    last_year_amount,
                    this_year_amount,
                    email,
                }
            );
        } catch (error) {
            console.log("BudgetService :: updateBudget :: error", error);
        }
    }

    async deletePost(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("BudgetService :: deleteBudget :: error", error);
            return false;
        }
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("BudgetService :: getBudget :: error", error);
            return false;
        }
    }

    async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("BudgetService :: getBudgets :: error", error);
            return false;
        }
    }

}

const service = new Service();
export default service;