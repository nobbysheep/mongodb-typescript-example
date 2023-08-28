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
import { activityCollections } from "../services/activity.database.service";
import { Activity } from "../models/schemas";
import { humansCollections } from "../services/humans.database.service";
import { Human } from "../models/schemas";
import { loadDates } from "../utils/loadDates";

// Global Config

export const calendarForHumanRouter = express.Router();

const catagoriesCollection = catagoriesCollections;
const activitiesCollection = activitiesCollections;
const datesCollection = datesCollections;
const activityCollection = activityCollections;
const humansCollection = humansCollections;

calendarForHumanRouter.use(express.json());

// GET all
calendarForHumanRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const dates = (await datesCollection.dates.find({}).toArray()) as unknown as CalendarDate[];
        type tmpArray = CalendarForHuman;
        const restultsArray: tmpArray[] = [];

        for (let i = 0; i < dates.length; i++) {
            let tmpDate: Date = dates[i].fullDate;
            let tmpWkNumber: number = dates[i].wkNumber;
            const tmpDateID = dates[i].id;
            const tmpActivityName: string = "";
            const tmpActivityDurationHours: number = 0;
            const tmpHumanName: string = "";
            const tmpCatagoryName: string = "";

            const query1 = { activityDateID: new ObjectId(dates[i].id) };
            const activities = (await activitiesCollection.activities.findOne(query1)) as unknown as Activities;
            if (activities) {
                const activitiesID = activities.activitiesID;
                const humanID = activities.humanID;
                let tmpActivityDurationHours = activities.activitiesDurationHours;
                const query2 = { _id: new ObjectId(activitiesID) };
                const activity = (await activityCollection.activity.findOne(query2)) as unknown as Activity;
                let tmpActivityName = activity.activityName;
                const query3 = { _id: new ObjectId(humanID) };
                const human = (await humansCollection.humans.findOne(query3)) as unknown as Human;
                let tmpHumanName = human.nameOfHuman;
                const query4 = { _id: new ObjectId(activity.catagoryID) };
                const catagories = (await catagoriesCollection.catagories.findOne(query4)) as unknown as Catagory;
                let tmpCatagoryName = catagories.catagoryName;
            }

            restultsArray.push({
                nameOfHuman: tmpHumanName,
                fullDate: tmpDate,
                wkNumber: tmpWkNumber,
                catagoryName: tmpCatagoryName,
                activityName: tmpActivityName,
                activityDurationHours: tmpActivityDurationHours
            });
        }

        res.status(200).send(restultsArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
