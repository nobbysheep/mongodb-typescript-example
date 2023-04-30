// External Dependencies

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const activityCollections: { activity?: mongoDB.Collection } = {};

// Initialize Connection

export async function activityConnectToDatabase(): Promise<void> {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const activityCollection: mongoDB.Collection = db.collection(process.env.ACTIVITY_COLLECTION_NAME);

    activityCollections.activity = activityCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${activityCollection.collectionName}`,
    );
}
