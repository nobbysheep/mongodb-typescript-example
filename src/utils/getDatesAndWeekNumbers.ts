// Dates generation returns an array of dates between two dates

import { weekNumber } from "weeknumber";

type dateAndWeekNumber = {
    fullDate: Date;
    weekNumber: number;
};

export function getDatesAndWeekNumbers({
    startDate,
    endDate,
}: {
    startDate: Date;
    endDate: Date;
}): dateAndWeekNumber[] {
    const dates: dateAndWeekNumber[] = [];
    let currentDate = startDate;
    const addDays = (currentDate: Date, days: number) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        return date;
    };
    while (currentDate <= endDate) {
        let tmpWeekNumber = weekNumber(currentDate);
        dates.push({ fullDate: currentDate, weekNumber: tmpWeekNumber });
        currentDate = addDays(currentDate, 1);
    }
    return dates;
}
