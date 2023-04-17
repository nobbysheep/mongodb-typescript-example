// Populate DB with array of dates and ISO week numbers
import { getWeekNumberFromISOString } from "../utils/getWeekNumbers";
import { getDates } from "../utils/dates";

export const dateRange = getDates({
    startDate: new Date(2022, 0, 1, 0, 0),
    endDate: new Date(2023, 12, 31, 23, 59, 59),
});

export function populateDates({ dateArray }: { dateArray: Date[]; }) {
    console.log(dateArray);
    for (let i = 0; i < dateArray.length; i++) {
        let weekNum = dateArray[i].toLocaleString();
        let weekNumSring = getWeekNumberFromISOString({ date: weekNum });
//        console.log(dateArray[i]);
//        console.log(weekNumSring);
    }
}
