// Populate DB with array of dates and ISO week numbers
import { getWeekNumberFromISOString } from "../utils/getWeekNumbers";
import { calendarDate } from "../models/schemas";

export function populateDates({ dateArray }: { dateArray: calendarDate[] }): void {
    console.log(dateArray);
    for (let i = 0; i < dateArray.length; i++) {
        let weekNum = dateArray[i].toLocaleString();
        let weekNumSring = getWeekNumberFromISOString({ date: weekNum });
        console.log(dateArray[i]);
        console.log(weekNumSring);
        }
    }
