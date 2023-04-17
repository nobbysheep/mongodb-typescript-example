// External Dependencies

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const collections: { dates?: mongoDB.Collection } = {};

// Initialize Connection

export async function datesConnectToDatabase(): Promise<void> {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const datesCollection: mongoDB.Collection = db.collection(process.env.DATES_COLLECTION_NAME);

    collections.dates = datesCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${datesCollection.collectionName}`,
    );
}
