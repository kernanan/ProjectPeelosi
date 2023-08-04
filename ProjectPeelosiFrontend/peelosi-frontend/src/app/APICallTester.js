const getConcreteDates = (timeOption) => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let currentDate = `${month}-${day}-${year}`;
    if (timeOption == '2W') {
        var twoWAgo = new Date();
        twoWAgo.setDate(twoWAgo.getDate() - 13)
        let day = twoWAgo.getDate();
        let month = twoWAgo.getMonth() + 1;
        let year = twoWAgo.getFullYear();
        fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
    if (timeOption == '1M') {
        var twoWAgo = new Date();
        twoWAgo.setMonth(twoWAgo.getMonth() - 1)
        let day = twoWAgo.getDate();
        let month = twoWAgo.getMonth() + 1;
        let year = twoWAgo.getFullYear();
        fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
    if (timeOption == '6M') {
        var twoWAgo = new Date();
        twoWAgo.setMonth(twoWAgo.getMonth() - 5)
        let day = twoWAgo.getDate();
        let month = twoWAgo.getMonth() + 1;
        let year = twoWAgo.getFullYear();
        fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
     else {
        var twoWAgo = new Date();
        twoWAgo.setYear(twoWAgo.getYear() - 1)
        let day = twoWAgo.getDate();
        let month = twoWAgo.getMonth() + 1;
        let year = twoWAgo.getFullYear();
        fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
}

async function getTickerPerformanceInStockMarket(tickerId) {
    let dateArgs = getConcreteDates('2W')
    var url = 'https://6o6b60nu7j.execute-api.us-east-1.amazonaws.com/getStockHistorical/' + tickerId + '?fromDate=' + dateArgs[0] + '&toDate=' + dateArgs[1]
    console.log(url)
    var jsonData = await makeAPICallGivenURL(url)
    return jsonData
}

async function makeAPICallGivenURL(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Response is not okay');
    }
    return response.json();
}

console.log(getConcreteDates('2W'))
console.log(getConcreteDates('1M'))
console.log(getConcreteDates('6M'))
console.log(getConcreteDates('1Y'))

async function waitToPrintStockMarketAPICall() {
  let data = await getTickerPerformanceInStockMarket('TSLA');
  console.log(data);
}

//waitToPrintStockMarketAPICall()

async function getMarketData(ticker, timeOption) {
    let dateArgs = getConcreteDates(timeOption)
    var url = 'https://6o6b60nu7j.execute-api.us-east-1.amazonaws.com/getStockHistorical/' + ticker + '?fromDate=' + dateArgs[0] + '&toDate=' + dateArgs[1]
    var waitForJson = await makeAPICallGivenURL(url)
    var data = waitForJson['values']
    marketSeriesData = []
    for (const [key, value] of Object.entries(data)) {
        let thisIndex = {x: key, y: value['open']}
        marketSeriesData.push(thisIndex)
    }
    console.log(marketSeriesData)
    if (marketSeriesData.length > 0) {
        var currentVal = marketSeriesData[marketSeriesData.length - 1]['y']
    } else {
        var currentVal = 0
    }

    return {name: ticker,
           currentValue: currentVal,
           seriesData: marketSeriesData}
}

async function waitToPrintStockMarketTransformer() {
  let data = await getMarketData('TSLA', '2W');
  console.log(data);
}

waitToPrintStockMarketTransformer()