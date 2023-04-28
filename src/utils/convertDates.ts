// Convert dates array to string array

export function convertDates({ tmpDateArray }: { tmpDateArray: Date[] }): String[] {
    const tmpDateString = [];
    console.log(tmpDateArray);
    for (let i = 0; i < tmpDateArray.length; i++) {
        tmpDateString.push(tmpDateArray[i].toString());
        //        console.log(tmpDateString[i]);
    }
    return tmpDateString;
}
