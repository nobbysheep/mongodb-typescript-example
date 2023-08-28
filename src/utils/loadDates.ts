import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { datesCollections } from "../services/dates.database.service";
import { CalendarDate } from "../models/schemas";
import { promises } from "stream";

const collections = datesCollections;

export async function loadDates(): Promise<CalendarDate[]> {
    try {
        const getDates = (await collections.dates.find({}).toArray()) as unknown as CalendarDate[];
        return (getDates);
    }
    catch {
        return(null);
    }
}