// External Dependencies

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const collections: { humans?: mongoDB.Collection } = {};

// Initialize Connection

export async function humansConnectToDatabase(): Promise<void> {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const humansCollection: mongoDB.Collection = db.collection(process.env.HUMANS_COLLECTION_NAME);

    collections.humans = humansCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${humansCollection.collectionName}`,
    );
}
