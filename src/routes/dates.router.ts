// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/dates.database.service";
import { calendarDates } from "../models/schemas";
import { populateDates } from "../utils/populateDates";
import { dateRange } from "../utils/populateDates";

// Global Config

export const datesRouter = express.Router();

datesRouter.use(express.json());

// POST
datesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDate = req.body as calendarDates;
        const result = await collections.dates.insertOne(newDate);

        result
            ? res.status(201).send(`Successfully created a new date with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new date.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

datesRouter.post("/populate", async (req: Request, res:Response) => {
    try {
        const pushDates = populateDates({ dateArray: dateRange });
        for (let i = 0; i < dateRange.length; i++) {
            const result = await collections.dates.insertOne(dateRange[i]);
        result
            ? res.status(201).send(`Successfully created a new date with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new date.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
})