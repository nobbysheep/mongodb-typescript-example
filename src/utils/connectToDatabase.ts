//* Connect to database(s)

// External Dependencies
import { humansConnectToDatabase } from "../services/humans.database.service";
import { datesConnectToDatabase } from "../services/dates.database.service";
import { activitiesConnectToDatabase } from "../services/activities.database.service";
import { catagoriesConnectToDatabase } from "../services/catagories.database.service";
import { activityConnectToDatabase } from "../services/activity.database.service";

//
export async function connectToDatabase(): Promise<void> {
    datesConnectToDatabase();
    activitiesConnectToDatabase();
    activityConnectToDatabase();
    catagoriesConnectToDatabase();
    humansConnectToDatabase();
}
