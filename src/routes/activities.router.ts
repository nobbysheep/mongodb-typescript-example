// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { activitiesCollections } from "../services/activities.database.service";
import { Activities } from "../models/schemas";

// Global Config

export const activitiesRouter = express.Router();
const collections = activitiesCollections;

activitiesRouter.use(express.json());

// GET
activitiesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const activities = (await collections.activities.find({}).toArray()) as unknown as Activities[];

        res.status(200).send(activities);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

activitiesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const activities = (await collections.activities.findOne(query)) as unknown as Activities;

        if (activities) {
            res.status(200).send(activities);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
activitiesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newActivities = req.body as Activities;
        const result = await collections.activities.insertOne(newActivities);

        result
            ? res.status(201).send(`Successfully created a new activitities with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new activities.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
activitiesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedActivities: Activities = req.body as Activities;
        const query = { _id: new ObjectId(id) };

        const result = await collections.activities.updateOne(query, { $set: updatedActivities });

        result
            ? res.status(200).send(`Successfully updated Activities with id ${id}`)
            : res.status(304).send(`Activities with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
activitiesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.activities.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed activities with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove activities with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Activities with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
