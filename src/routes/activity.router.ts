// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { activityCollections } from "../services/activity.database.service";
import { Activity } from "../models/schemas";

// Global Config

export const activityRouter = express.Router();
const collections = activityCollections;

activityRouter.use(express.json());

// GET
activityRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const activity = (await collections.activity.find({}).toArray()) as unknown as Activity[];

        res.status(200).send(activity);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

activityRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const activity = (await collections.activity.findOne(query)) as unknown as Activity;

        if (activity) {
            res.status(200).send(activity);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
activityRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newActivity = req.body as Activity;
        const result = await collections.activity.insertOne(newActivity);

        result
            ? res.status(201).send(`Successfully created a new activitiy with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new activity.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
activityRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedActivity: Activity = req.body as Activity;
        const query = { _id: new ObjectId(id) };

        const result = await collections.activity.updateOne(query, { $set: updatedActivity });

        result
            ? res.status(200).send(`Successfully updated Activity with id ${id}`)
            : res.status(304).send(`Activity with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
activityRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.activity.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed activity with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove activity with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Activity with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
