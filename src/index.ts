import express, { Application } from "express";
import * as dotenv from "dotenv";

// External dependancies
import { catagoriesRouter } from "./routes/catagories.router";
import { humansRouter } from "./routes/humans.router";
import { activitiesRouter } from "./routes/activities.router";
import { activityRouter } from "./routes/activity.router";
import { datesRouter } from "./routes/dates.router";
import { connectToDatabase } from "./utils/connectToDatabase";

dotenv.config(); // load env config from .env file

const app = express();
const port = process.env.PORT; // default port to listen
export default app;

connectToDatabase()
    .then(() => {
        app.use("/humans", humansRouter);

        app.use("/activity", activityRouter);

        app.use("/activities", activitiesRouter);

        app.use("/catagories", catagoriesRouter);

        app.use("/dates", datesRouter);

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

