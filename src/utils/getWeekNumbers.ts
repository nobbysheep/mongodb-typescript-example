// Get ISO week numbers taken from https://gist.github.com/TorbjornHoltmon/ecece5c1e2b5c44266f92935cb0a2352

export function getWeekNumberFromISOString({ date }: { date: string }): number {
    const newYear = new Date(new Date(date).getFullYear(), 0, 1);
    let day = newYear.getDay() - 1; // the day of week the year begins on
    day = day >= 0 ? day : day + 7;
    const dayNumber: number =
        Math.floor(
            (new Date(date).getTime() -
                newYear.getTime() -
                (new Date(date).getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
                86400000,
        ) + 1;
    let weekNumber: number;
    // if the year starts before the middle of a week
    if (day < 4) {
        weekNumber = Math.floor((dayNumber + day - 1) / 7) + 1;
        if (weekNumber > 52) {
            const nYear = new Date(new Date(date).getFullYear() + 1, 0, 1);
            let nday = nYear.getDay() - 1;
            nday = nday >= 0 ? nday : nday + 7;

            /*  if the next year starts before the middle of
             the week, it is week #1 of that year  */

            weekNumber = nday < 4 ? 1 : 53;
        }
    } else {
        weekNumber = Math.floor((dayNumber + day - 1) / 7);
    }
    return weekNumber;
}

