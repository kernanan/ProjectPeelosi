import datetime

# from StockMarketAPICaller import StockMarketAPICaller

import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
from StockMarketAPICaller import StockMarketAPICaller





class DarqubeAPICaller(StockMarketAPICaller):

    def __init__(self):
        self.authToken = '7a4c07f9a79b499b8d64c4268e724a8a'

    def getHistoricalStockData(self, tickerId, fromDate, toDate):
        fromDate = self.convertToUnixTime(fromDate)
        toDate = self.convertToUnixTime(toDate)
        marketDataFromTickerURL = 'https://api.darqube.com/data-api/market_data/historical/' + tickerId + '?token={0}&start_date={1}&end_date={2}&interval=1d'.format(self.authToken, fromDate, toDate)
        headers = {'accept': 'application/json'}
        historicalData = self.requestJSONByURL(marketDataFromTickerURL, headers=headers)
        historicalData = self.reformatToStandard(historicalData)
        return historicalData

    def convertToUnixTime(self, initialDate):
        dateObj = datetime.datetime.strptime(initialDate, "%m-%d-%Y")
        unixTime = int(dateObj.timestamp())
        return unixTime

    def reformatToStandard(self, historicalData):
        reformatted = {}
        index = 0
        for data in historicalData:
            if 'time' in data:
                timestamp = data['time']
                datetime_obj = datetime.datetime.fromtimestamp(timestamp)
                formatted_date = datetime_obj.strftime("%m-%d-%Y")
                historicalData[index]['time'] = formatted_date
                reformatted[formatted_date] = historicalData[index]
            index = index + 1

        return reformatted

    def main(self):
        result = self.getHistoricalStockData("TSLA", "2023-06-25", "2023-06-30")
        print(result)

if __name__ == "__main__":
    obj = DarqubeAPICaller()
    obj.main()
