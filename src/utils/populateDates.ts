//
import { getWeekNumberFromISOString } from "../utils/getWeekNumbers";
import { convertDates } from "../utils/convertDates";
import { getDates } from "../utils/getDates";
import { weekNumber } from 'weeknumber'

// Populate DB with array of dates and ISO week numbers
export function populateDates(): string[] {
    // Build initial array with dates
    const dateArray: Date[] = getDates({
        startDate: new Date(2022, 0, 1, 0, 0),
        endDate: new Date(2022, 1, 31, 23, 59, 59),
    });
    // Convert dates array to ISO strings and add ISO week numbers
    const tmpArray = [];
    for (let i = 0; i < dateArray.length; i++) {
        let tmpISO: string = dateArray[i].toISOString();
        let weekNum: string = String(weekNumber(dateArray[i]));
        tmpArray.push(tmpISO, weekNum);
        //console.log(tmpArray[i]);
    }
    return tmpArray;
}
