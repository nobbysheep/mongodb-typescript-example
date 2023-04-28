//
import { getWeekNumberFromISOString } from "../utils/getWeekNumbers";
import { convertDates } from "../utils/convertDates";
import { getDates } from "../utils/getDates";


// Populate DB with array of dates and ISO week numbers
export function populateDates(): String[] {
    // Build initial array with dates
    const dateArray: Date[] = getDates({
        startDate: new Date(2022, 0, 1, 0, 0),
        endDate: new Date(2022, 1, 31, 23, 59, 59),
    });
    // Convert them all to strings
    const tmpConvertedDateArray = convertDates({ tmpDateArray: dateArray });
    for (let i = 0; i < tmpConvertedDateArray.length; i++) {
        let weekNum = tmpConvertedDateArray[i].toLocaleString();
        let weekNumSring = getWeekNumberFromISOString({ date: weekNum });
        tmpConvertedDateArray[i] = `{` + tmpConvertedDateArray[i] + `,` + weekNumSring + `}`;
        console.log(tmpConvertedDateArray[i]);
    //    console.log(weekNumSring);
    }
    return tmpConvertedDateArray;
}
