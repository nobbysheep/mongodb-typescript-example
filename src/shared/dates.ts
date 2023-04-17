// Dates generation

export const getDates = (startDate: Date, endDate: Date) => {
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
};
