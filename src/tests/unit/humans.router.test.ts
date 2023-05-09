import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { humansCollections } from "../../services/humans.database.service";
import { Human } from "../../models/schemas";

describe('testing database connection', () => {
    let con: MongoClient;
    let mongoServer: MongoMemoryServer;
    const collections = humansCollections;

    // type tmpHuman = {nameOfHuman: string, typeOfHuman: string, teamOfHuman: string, fteOfHuman: number};

    beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      con = await MongoClient.connect(mongoServer.getUri(), {});
});

    afterAll(async () => {
      if (con) {
          await con.close();
      }
      if (mongoServer) {
          await mongoServer.stop();
      }
    });

    it("should successfully set & get information from the database", async () => {
      const db = con.db(mongoServer.instanceInfo!.dbName);

      expect(db).toBeDefined();
      
      const collections = humansCollections;

      const tmpHuman = { nameOfHuman: "FRED", typeOfHuman: "FRED TYPE", teamOfHuman: "FRED TEAM", fteOfHuman: 1 } as Human;
      const result = await collections.insertOne(tmpHuman);
      
      const tmpID = result.insertedId;
      const query = { _id: new ObjectId(tmpID) };
      const insertedHuman = (await collections.humans.findOne(query)) as unknown as Human;

      expect(insertedHuman).toEqual(tmpHuman);
  });
  });


