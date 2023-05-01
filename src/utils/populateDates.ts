//
import { getWeekNumberFromISOString } from "../utils/getWeekNumbers";
import { convertDates } from "../utils/convertDates";
import { getDates } from "../utils/getDates";
import { weekNumber } from 'weeknumber'

// Populate DB with array of dates and ISO week numbers
export function populateDates(): (string|number)[] {
    // Build initial array with dates
    const dateArray: Date[] = getDates({
        startDate: new Date(2022, 0, 1, 0, 0),
        endDate: new Date(2022, 1, 31, 23, 59, 59),
    });
    // Convert dates array to ISO strings and add ISO week numbers
    let tmpISO = dateArray[0].toISOString();
    let weekNum = weekNumber(dateArray[0]);
    const tmpArray: [tmpISO: string, weekNum: number] = [tmpISO, weekNum];
    for (let i = 1; i < dateArray.length; i++) {
        let tmpISO = dateArray[i].toISOString();
        let weekNum = weekNumber(dateArray[i]);
        tmpArray.push(tmpISO,weekNum);
    }
    return tmpArray;
}
