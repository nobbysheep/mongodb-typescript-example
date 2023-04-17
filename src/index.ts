import express from "express";
import { humansConnectToDatabase } from "./services/humans.database.service";
import { datesConnectToDatabase } from "./services/dates.database.service";
import { activitiesConnectToDatabase } from "./services/activities.database.service";
import { catagoriesConnectToDatabase } from "./services/catagories.database.service";
import { catagoriesRouter } from "./routes/catagories.router";

import { humansRouter } from "./routes/humans.router";
import { getDates } from "./utils/dates";
import { populateDates } from "./utils/dates";
import { activitiesRouter } from "./routes/activities.router";

const app = express();
const port = 8080; // default port to listen

datesConnectToDatabase();
activitiesConnectToDatabase();
catagoriesConnectToDatabase();

humansConnectToDatabase()
    .then(() => {
        app.use("/humans", humansRouter);

        app.use("/activies", activitiesRouter);

        app.use("/catagories", catagoriesRouter);

        app.use("/dates", (req, res) => {
            const rangeDates = getDates({
                startDate: new Date(2022, 0, 1, 0, 0),
                endDate: new Date(2023, 12, 31, 23, 59, 59),
            });
            res.send(rangeDates);
            const pushDates = populateDates({ dateArray: rangeDates });
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
