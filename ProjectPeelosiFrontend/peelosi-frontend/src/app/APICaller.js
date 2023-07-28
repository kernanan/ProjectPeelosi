export const getMarketData = (ticker, timeOption) => {
    if (timeOption == '2W') {
        let dateRange = getDateRange(13)
        return {'x': dateRange,
                'y': [12, 1, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 8],
                'name': 'META Platforms Inc.',
                'currentValue': 8};
    }
    if (timeOption == '1M') {
        let dateRange = getDateRange(30)
        return {'x': dateRange,
                'y': [12, 19, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 8, 5, 4, 1, 3, 2, 8,20, 21, 22, 4, 5, 6, 7,8, 10, 17, 30],
                'name': 'TSLA Company',
                'currentValue': 30};
    }
    if (timeOption == '1Y') {
        let dateRange = getDateRange(365)
        return {'x': dateRange,
                'y': [12, 19, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 8],
                'name': 'META Platforms Inc.',
                'currentValue': 8};
    }
    else {
        let dateRange = getDateRange(365 * 3)
        return {'x': dateRange,
                'y': [12, 19, 10, 14, 8, 16, 12, 9, 10, 17, 13, 9, 6],
                'name': 'TSLA Company',
                'currentValue': 6};
    }
};

export const getTargetData = (name, timeOption) => {
    if (name == 'Nancy Pelosi') {
        return {'buys': [null, 12, 6, null, 3, null, null, 14, 16],
                'sells': [3, 2, 1, null, 5]}
    }
    if (name == 'Mike Garcia') {
        return {'buys': [5, null, null, 7, 8],
                'sells': [3, null, 6, null, null, null, null, 4]}
    }
    else {
        return {'buys': [],
        'sells': []}
    }
}

const getDateRange = (lastXDays) => {
    let dateRange = []
    for (let i = lastXDays; i > 0; i--) {
        var ourDate = new Date();
        var pastDate = ourDate.getDate() - i;
        ourDate.setDate(pastDate);
        var dateString = (ourDate.getMonth() + 1) + '-' + ourDate.getDate() + '-' + ourDate.getFullYear()
        dateRange.push(dateString)

    }
    console.log(dateRange)
    return dateRange
}