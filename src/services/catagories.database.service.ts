// External Dependencies

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const collections: { catagories?: mongoDB.Collection } = {};

// Initialize Connection

export async function catagoriesConnectToDatabase(): Promise<void> {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const catagoriesCollection: mongoDB.Collection = db.collection(process.env.CATAGORIES_COLLECTION_NAME);

    collections.catagories = catagoriesCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${catagoriesCollection.collectionName}`,
    );
}
