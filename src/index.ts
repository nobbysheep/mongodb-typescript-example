import express from "express";
import { connectToDatabase } from "./services/humans.database.service";
import { humansRouter } from "./routes/humans.router";
import { getDates } from "./shared/dates";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/humans", humansRouter);

        app.use("/dates", (req, res) => {
            const rangeDates = getDates(new Date(2022, 0, 1, 0, 0), new Date(2023, 12, 31, 23, 59, 59));
            res.send(rangeDates);
        });

        app.use("/", (req, res) => {
            res.send("Hello world!");
        });

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

// const dates = getDates(new Date(2022, 0, 1, 0, 0), new Date(2023, 12, 31, 23, 59, 59));
// console.log(dates);
