// External Dependencies

import express, { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { activitiesCollections } from "../services/activities.database.service";
import { Activities } from "../models/schemas";
import { CalendarForHuman } from "../models/schemas";
import { catagoriesCollections } from "../services/catagories.database.service";
import { Catagory } from "../models/schemas";

// Global Config

export const CalendarForHumanRouter = express.Router();
const catagoriesCollection = catagoriesCollections;
const activitiesCollection = activitiesCollections;

CalendarForHumanRouter.use(express.json());

// GET
CalendarForHumanRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const activities = (await activitiesCollection.activities.find({}).toArray()) as unknown as Activities[];
        const catagories = (await catagoriesCollection.catagories.find({}).toArray()) as unknown as Catagory[];

        res.status(200).send(activities);
    } catch (error) {
        res.status(500).send(error.message);
    }
});