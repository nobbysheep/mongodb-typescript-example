// External Dependencies

import express, { Request, Response } from "express";
import { Collection, ObjectId } from "mongodb";
import { activitiesCollections } from "../services/activities.database.service";
import { Activities } from "../models/schemas";
import { CalendarForHuman } from "../models/schemas";
import { catagoriesCollections } from "../services/catagories.database.service";
import { Catagory } from "../models/schemas";
import { datesCollections } from "../services/dates.database.service";
import { CalendarDate } from "../models/schemas";

// Global Config

export const calendarForHumanRouter = express.Router();
const catagoriesCollection = catagoriesCollections;
const activitiesCollection = activitiesCollections;
const datescollections = datesCollections;

calendarForHumanRouter.use(express.json());

// GET all
calendarForHumanRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const dates = (await datesCollections.dates.find({}).toArray()) as unknown as CalendarDate[];
        type tmpArray = CalendarForHuman;
        const restultsArray:tmpArray [] = [];

        for (let i = 0; i < dates.length; i++) {
            let tmpDate: Date = dates[i].fullDate;
            let tmpWkNumber = dates[i].wkNumber;
            //const query = { activityDate: new Date(activityDate) };
            //const catagories = (await catagoriesCollections.catagories.findOne(tmpDate)) as unknown as Catagory;
            restultsArray.push({fullDate: tmpDate, wkNumber: tmpWkNumber, catagoryName: "", activityName: ""});
        }
        //const activities = (await activitiesCollection.activities.find({}).toArray()) as unknown as Activities[];
        
        res.status(200).send(restultsArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
});