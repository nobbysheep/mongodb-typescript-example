// Dates generation returns an array of dates between two dates

export function getDates({ startDate, endDate }: { startDate: Date; endDate: Date }): Date[] {
    const dates = [];
    let currentDate = startDate;
    const addDays = (currentDate: Date, days: number) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        return date;
    };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dates;
}
