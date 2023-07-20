

export const getMarketData = (ticker, timeOption) => {
    if (timeOption == '2W') {
        let dateRange = getDateRange(13)
        return {'x': dateRange,
                'y': [12, 19, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 8]};
    }
    if (timeOption == '1M') {
        let dateRange = getDateRange(30)
        return {'x': dateRange,
                'y': [12, 19, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 8, 5, 4, 1, 3, 2, 8,20, 21, 22, 4, 5, 6, 7,8, 10, 17, 30]};
    }
    else {
        let dateRange = getDateRange(13)
        return {'x': dateRange,
                'y': [12, 19, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 8]};
    }
};

const getDateRange = (lastXDays) => {
    let dateRange = []
    const firstDay = new Date()
    firstDay.setDate(firstDay.getDate() - lastXDays)
    for (let i = 0; i < lastXDays; i++) {
        firstDay.setDate(firstDay.getDate() + i)
        let yyyy = firstDay.getFullYear();
        let mm = firstDay.getMonth();
        let dd = firstDay.getDate();
        let formattedDate = mm + '-' + dd + '-' + yyyy
        dateRange.push(formattedDate)
    }
    console.log(dateRange)
    return dateRange
}