// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Human from "../models/humans";

// Global Config

export const humansRouter = express.Router();

humansRouter.use(express.json());

// GET
humansRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const human = (await collections.humans.find({}).toArray()) as unknown as Human[];

        res.status(200).send(Human);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

humansRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const human = (await collections.humans.findOne(query)) as unknown as Human;

        if (human) {
            res.status(200).send(Human);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
humansRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newHuman = req.body as Human;
        const result = await collections.humans.insertOne(newHuman);

        result
            ? res.status(201).send(`Successfully created a new human with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new human.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
humansRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedHuman: Human = req.body as Human;
        const query = { _id: new ObjectId(id) };

        const result = await collections.humans.updateOne(query, { $set: updatedHuman });

        result
            ? res.status(200).send(`Successfully updated Human with id ${id}`)
            : res.status(304).send(`Human with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
humansRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.humans.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed human with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove human with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Human with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
