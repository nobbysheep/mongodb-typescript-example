import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../utils/connectToDatabase";
import { humansConnectToDatabase } from "../../services/humans.database.service";

describe('testing database connection', () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;


    test('connection should be good', () => {
      
    });
  });


