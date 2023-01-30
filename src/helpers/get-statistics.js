export const getAverage = (arr) => {
    let sum = 0;
    arr.forEach(element => sum += Number(element));
    return (sum/arr.length).toFixed(2);
};
export const getStandardDeviation = (arr) => {
    let mean = getAverage(arr)
    arr = arr.map((k)=> (k - mean) ** 2 );
    let sum = arr.reduce((acc, curr)=> acc + curr, 0);
    return Math.sqrt((sum / arr.length));
}

export const addYears = (date, years) => {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate.toUTCString();
};