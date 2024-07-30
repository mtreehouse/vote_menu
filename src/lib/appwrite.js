import { Client, Databases } from "appwrite";

const client = new Client();
const DB_ID = "66a865f1001661c966cf";
const COLLECTION_ID = "66a86601001cf75cc73f";

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66a8657700090ef55bc5");

export const databases = new Databases(client);

export { client, DB_ID, COLLECTION_ID };
