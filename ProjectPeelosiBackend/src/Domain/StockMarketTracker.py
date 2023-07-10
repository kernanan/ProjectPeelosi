import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.append(parent_dir)
from Data.GeneralStockMarket.DarqubeAPICaller import DarqubeAPICaller

class StockMarketTracker():

    def __init__(self, source):
        if source == 'Darqube':
            self.marketAPICaller = DarqubeAPICaller()
        else:
            print('This source is invalid, defaulting to Darqube\'s API')

    def getHistoricalData(self, tickerId, fromDate, toDate):
        print('Getting stock data on ticker {0}'.format(tickerId))
        try:
            data = self.marketAPICaller.getHistoricalStockData(tickerId, fromDate, toDate)
            if len(data) == 0:
                return 'No data for {0} found'.format(tickerId)
            else:
                return {"data": tickerId, "values": data}
        except Exception as e:
            print("An exception occurred: ", repr(e))

