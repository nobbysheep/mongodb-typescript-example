// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { datesCollections } from "../services/dates.database.service";
import { calendarDate } from "../models/schemas";
import { populateDates } from "../utils/populateDates";
import { getDates } from "../utils/getDates";
import { convertDates } from "../utils/convertDates";

// Global Config

export const datesRouter = express.Router();
const collections = datesCollections;

datesRouter.use(express.json());

// GET
datesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const getDates = (await collections.dates.find({}).toArray()) as unknown as calendarDate[];

        res.status(200).send(getDates);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST
datesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDate = req.body as calendarDate;
        const result = await collections.dates.insertOne(newDate);

        result
            ? res.status(201).send(`Successfully created a new date with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new date.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

datesRouter.post("/populate", async (req: Request, res: Response) => {
    const tmpArray: (string|number)[] = populateDates();
    const restultsArray = [];
    try {
        for (let i = 0; i < tmpArray.length; i++) {    
            const newDate = { fullDate: tmpArray[i], wkNumber: tmpArray[i+1] } as calendarDate;
            const result = await collections.dates.insertOne(newDate);
            restultsArray[i] = result.insertedId;
            i++;
                
        //result
        //    ? res.status(201).send(`Successfully created a new date with id ${result.insertedId}`)
        //    : res.status(500).send("Failed to create a new date.");
            } 
            res.status(201).send(`Successfully created a new date with id ${restultsArray}`)
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
