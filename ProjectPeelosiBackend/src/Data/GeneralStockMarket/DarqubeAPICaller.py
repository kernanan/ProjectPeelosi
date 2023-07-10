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
        marketDataFromTickerURL = 'https://api.darqube.com/data-api/market_data/historical/TSLA?token={0}&start_date={1}&end_date={2}&interval=1d'.format(self.authToken, fromDate, toDate)
        headers = {'accept': 'application/json'}
        historicalData = self.requestJSONByURL(marketDataFromTickerURL, headers=headers)
        return historicalData

    def convertToUnixTime(self, initialDate):
        dateObj = datetime.datetime.strptime(initialDate, "%Y-%m-%d")
        unixTime = int(dateObj.timestamp())
        return unixTime

    def main(self):
        result = self.getHistoricalStockData("TSLA", "2023-06-25", "2023-06-30")
        print(result)

if __name__ == "__main__":
    obj = DarqubeAPICaller()
    obj.main()
