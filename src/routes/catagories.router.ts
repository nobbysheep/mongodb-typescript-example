// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { catagoriesCollections } from "../services/catagories.database.service";
import { Catagory } from "../models/schemas";

// Global Config

export const catagoriesRouter = express.Router();

catagoriesRouter.use(express.json());

// GET
catagoriesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const catagories = (await catagoriesCollections.catagories.find({}).toArray()) as unknown as Catagory[];

        res.status(200).send(catagories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

catagoriesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const catagories = (await collections.catagories.findOne(query)) as unknown as Catagory;

        if (catagories) {
            res.status(200).send(catagories);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
catagoriesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newCatagory = req.body as Catagory;
        const result = await collections.catagories.insertOne(newCatagory);

        result
            ? res.status(201).send(`Successfully created a new catagory with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new catagory.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
catagoriesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCatagory: Catagory = req.body as Catagory;
        const query = { _id: new ObjectId(id) };

        const result = await collections.catagories.updateOne(query, { $set: updatedCatagory });

        result
            ? res.status(200).send(`Successfully updated Catagory with id ${id}`)
            : res.status(304).send(`Catagory with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
catagoriesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.catagories.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed catagory with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove catagory with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Catagory with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
