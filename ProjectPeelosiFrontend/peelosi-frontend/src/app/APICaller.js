var corsProxyUrl = "https://cors-anywhere.herokuapp.com/"
var baseURL = 'https://6o6b60nu7j.execute-api.us-east-1.amazonaws.com'

export async function getMarketData(ticker, timeOption) {
    let dateArgs = getConcreteDates(timeOption)
    var url = corsProxyUrl + 'https://6o6b60nu7j.execute-api.us-east-1.amazonaws.com/getStockHistorical/' + ticker + '?fromDate=' + dateArgs[0] + '&toDate=' + dateArgs[1]
    console.log(url)
    var waitForJson = await makeAPICallGivenURL(url, {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    })
    var data = waitForJson['values']
    var marketSeriesData = []
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

export const getTargetData = async(name, ticker, timeOption) => {
    let dateArgs = getConcreteDates(timeOption)
    var url = corsProxyUrl + baseURL + '/getPoliticianHistorical/' + name + '/' + ticker + '?fromDate=' + dateArgs[0] + '&toDate' + dateArgs[1]
    console.log(url)
    var waitForJson = await makeAPICallGivenURL(url, {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    })
    var data = waitForJson['values']
    let tbuys = []
    let tsells = []
    for (const [key, value] of Object.entries(data)) {
        let thisIndex = {x: key,
                         y: value['change']}
        if (thisIndex.y > 0) {
            tbuys.push(thisIndex)
        } else {
            thisIndex.y = thisIndex.y * -1
            tsells.push(thisIndex)
        }
    }
    return [tbuys, tsells]
}

export const getStocksBoughtByData = async(ticker, timeOption) => {
    let dateArgs = getConcreteDates(timeOption)
    var url = corsProxyUrl + baseURL + '/getStockTradesHistorical/' + ticker + '?fromDate=' + dateArgs[0] + '&toDate=' + dateArgs[1]
    console.log(url)
    var waitForJson = await makeAPICallGivenURL(url, {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    })

    if(waitForJson[ticker] == 'No Data Found') {
        console.log('No Data Found')
        return [[{name: "No buys found",
                 type: "column",
                 data: []}],
                [{name: "No sells found",
                 type: "column",
                 data: []}]]
    }

    var data = waitForJson[ticker]
    var allSeriesBuyData = []
    var allSeriesSellData = []
    console.log(data)
    for (const [key, value] of Object.entries(data)) {
        var thisSeriesBuySeries = {name: key + " buys",
                          type: "column"}
        var thisSeriesSellsSeries = {name: key + " buys",
                          type: "column"}
        var thisSeriesBuyData = []
        var thisSeriesSellData = []
        for (const [key2, value2] of Object.entries(value)) {
            let thisIndexData = {x: key2,
                             y: value2['change']}
            if(thisIndexData.y > 0){
                thisSeriesBuyData.push(thisIndexData)
            } else {
                thisIndexData.y = thisIndexData.y * -1
                thisSeriesSellData.push(thisIndexData)
            }
        }
        thisSeriesBuySeries.data = thisSeriesBuyData
        thisSeriesSellsSeries.data = thisSeriesSellData
        allSeriesBuyData.push(thisSeriesBuySeries)
        allSeriesSellData.push(thisSeriesSellsSeries)
    }
    return [allSeriesBuyData, allSeriesSellData]





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
        if (day < 10) {
            day = "0" + day
        }
        let month = twoWAgo.getMonth() + 1;
        if (month < 10) {
           month = "0" + month
        }
        let year = twoWAgo.getFullYear();
        let fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
    if (timeOption == '1M') {
        var twoWAgo = new Date();
        twoWAgo.setMonth(twoWAgo.getMonth() - 1)
        let day = twoWAgo.getDate();
        if (day < 10) {
            day = "0" + day
        }
        let month = twoWAgo.getMonth() + 1;
        if (month < 10) {
           month = "0" + month
        }
        let year = twoWAgo.getFullYear();
        let fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
    if (timeOption == '6M') {
        var twoWAgo = new Date();
        twoWAgo.setMonth(twoWAgo.getMonth() - 5)
        let day = twoWAgo.getDate();
        let month = twoWAgo.getMonth() + 1;
        let year = twoWAgo.getFullYear();
        let fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
     else {
        var twoWAgo = new Date();
        twoWAgo.setYear(twoWAgo.getYear() - 1)
        let day = twoWAgo.getDate();
        let month = twoWAgo.getMonth() + 1;
        let year = twoWAgo.getFullYear();
        let fromDate = `${month}-${day}-${year}`;
        return [fromDate, currentDate]
    }
}

async function makeAPICallGivenURL(url) {
    const response = await fetch(url);
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
        console.log("Response failed")
        console.log(response.json)
        throw new Error('Response is not okay');
    }
    return data;
}

//this is the main

//module.exports = {
//    getConcreteDates
//}