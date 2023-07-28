
from Data.GeneralStockMarket.StockMarketAPICaller import StockMarketAPICaller

import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
class FastTrackAPICaller(StockMarketAPICaller):

    def __init__(self):
        self.authToken = '7a4c07f9a79b499b8d64c4268e724a8a'
    def getHistoricalStockData(self, tickerId, fromDate, toDate):
        pass

    def reformatToStandard(self, historicalData):
        pass