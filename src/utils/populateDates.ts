//
import { getWeekNumberFromISOString } from "../utils/getWeekNumbers";
import { convertDates } from "../utils/convertDates";
import { getDates } from "../utils/getDates";
import { weekNumber } from 'weeknumber'

// Populate DB with array of dates and ISO week numbers
export function populateDates(): (string|number)[] {
    // Build initial array with dates
    const dateArray: Date[] = getDates({
        startDate: new Date(2022, 0, 1),
        endDate: new Date(2022, 2, 31),
    });
    // Convert dates array to ISO strings and add ISO week numbers
    const tmpArray: [string, number] = [dateArray[0].toISOString(), weekNumber(dateArray[0])];
    //tmpArray.push(tmpISO,weekNum);
    for (let i = 1; i < dateArray.length; i++) {
        let tmpISO = dateArray[i].toISOString();
        let weekNum = weekNumber(dateArray[i]);
        tmpArray.push(tmpISO,weekNum);
        //console.log(i);
        //tmpArray[i] = dateArray[i].toISOString();
        //tmpArray[i+1] = weekNumber(dateArray[i]);
    }
    return tmpArray;
}
