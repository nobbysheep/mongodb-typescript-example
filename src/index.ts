import express from "express";
import { connectToDatabase } from "./services/database.service";
import { humansRouter } from "./routes/humans.router";
import { getDates } from "./shared/dates";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        
        app.use("/humans", humansRouter);
        
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

const dates = getDates(new Date(2018, 0, 30, 11, 30), new Date(2018, 2, 2, 23, 59, 59)); 
console.log(dates);