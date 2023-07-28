

export const getMarketData = (ticker, timeOption) => {
    if (timeOption == '2W') {
        let data = {"07-14-2023": {
              "open": 268.65,
              "close": 271.99,
              "time": "07-24-2023"
            },
            "07-15-2023": {
              "close": 271.99,
              "open": 276.325,
              "time": "07-25-2023"
            },"07-16-2023": {
              "open": 268.65,
              "close": 271.99,
              "time": "07-24-2023"
            },
            "07-17-2023": {
              "close": 271.99,
              "open": 250,
              "time": "07-25-2023"
            },"07-18-2023": {
              "open": 268.65,
              "close": 250,
              "time": "07-24-2023"
            },
            "07-19-2023": {
              "close": 271.99,
              "open": 199,
              "time": "07-25-2023"
            },
            "07-20-2023": {
              "close": 271.99,
              "open": 230,
              "time": "07-25-2023"
            },
            "07-21-2023": {
              "close": 271.99,
              "open": 255,
              "time": "07-25-2023"
            },
            "07-22-2023": {
              "close": 271.99,
              "open": 257,
              "time": "07-25-2023"
            },
            "07-23-2023": {
              "close": 271.99,
              "open": 260,
              "time": "07-25-2023"
            },
            "07-24-2023": {
              "close": 271.99,
              "open": 245,
              "time": "07-25-2023"
            },
            "07-25-2023": {
              "close": 271.99,
              "open": 276,
              "time": "07-25-2023"
            },
            "07-26-2023": {
              "close": 271.99,
              "open": 298,
              "time": "07-25-2023"
            },
            "07-27-2023": {
              "close": 300,
              "open": 276.325,
              "time": "07-25-2023"
            },
            "07-28-2023": {
              "close": 271.99,
              "open": 289,
              "time": "07-25-2023"
            }
        }
        let marketSeriesData = []
        for (const [key, value] of Object.entries(data)) {
            let thisIndex = {x: key, y: value['open']}
            marketSeriesData.push(thisIndex)
        }
        return marketSeriesData
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
        let data = {"07-20-2023": {
              "share": 57234,
              "change": 1250,
              "filingDate": "07-20-2023",
              "transactionDate": "07-16-2023",
              "transactionCode": "S",
              "transactionPrice": 655.81
              },
              "07-28-2023": {
                      "share": 19114,
                      "change": -1500,
                      "filingDate": "2021-03-31",
                      "transactionDate": "07-26-2023",
                      "transactionCode": "S",
                      "transactionPrice": 615.75
              }}
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
    if (name == 'Mike Garcia') {
        let data = {"07-15-2023": {
              "share": 57234,
              "change": 800,
              "filingDate": "07-20-2023",
              "transactionDate": "07-15-2023",
              "transactionCode": "S",
              "transactionPrice": 655.81
                },
                "07-22-2023": {
                      "share": 19114,
                      "change": 500,
                      "filingDate": "2021-03-31",
                      "transactionDate": "07-22-2023",
                      "transactionCode": "S",
                      "transactionPrice": 615.75
                  }}
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
    else {
        return {}
    }
}

export const getStocksBoughtByData = (ticker, timeOption) => {
    var newSeries = []
    var data =  {
        "Baglino Andrew D": [
          {
            "change": -6690,
            "filingDate": "07-20-2023",
            "name": "Baglino Andrew D",
            "symbol": "TSLA",
            "transactionCode": "M",
            "transactionDate": "07-20-2023"
          }
        ],
        "Kirkhorn Zachary": [
          {
            "share": 57234,
            "change": 1250,
            "filingDate": "07-21-2023",
            "transactionDate": "07-21-2023",
            "transactionCode": "S",
            "transactionPrice": 655.81
          },
          {
            "share": 19114,
            "change": -1500,
            "filingDate": "07-23-2023",
            "transactionDate": "07-23-2023",
            "transactionCode": "S",
            "transactionPrice": 615.75
          }
        ]
    }

    var allSeriesBuyData = []
    var allSeriesSellData = []
    for (const [key, value] of Object.entries(data)) {
        var thisSeriesBuySeries = {name: key + " buys",
                          type: "column"}
        var thisSeriesSellsSeries = {name: key + " buys",
                          type: "column"}
        var thisSeriesBuyData = []
        var thisSeriesSellData = []
        for (let i = 0; i < value.length; i++) {
            let thisIndexData = {x: value[i]["transactionDate"],
                             y: value[i]["change"]}
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