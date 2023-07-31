import re

# from ProjectPeelosiBackend.src.Data.TargetStocks.BenzingaAPICaller import BenzingaAPICaller
# from ProjectPeelosiBackend.src.Data.TargetStocks.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller
# from ProjectPeelosiBackend.src.Data.TargetStocks.QuiverAPICaller import QuiverAPICaller

import os
import sys

from Data.TargetStocks.FinnhubAPICaller import FinnhubAPICaller

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.append(parent_dir)
from Data.TargetStocks.BenzingaAPICaller import BenzingaAPICaller
from Data.TargetStocks.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller
from Data.TargetStocks.QuiverAPICaller import QuiverAPICaller

class TargetTracker():

    def __init__(self, source):
        if source == 'Quiver':
            self.APICaller = QuiverAPICaller()
        elif source == 'Benzinga':
            self.APICaller = BenzingaAPICaller()
        elif source == 'HouseStockWatcherAPI':
            self.APICaller = HouseStockWatcherAPICaller()
        elif source == 'HouseStockWatcherAPI':
            self.APICaller = FinnhubAPICaller()
        else:
            print('The Source you have entered is invalid. Defaulting to Benzinga.')
            self.APICaller = BenzingaAPICaller()
        self.users = {}

    def getStatsticsOnStock(self, tickerId, fromTransactionDate, toTransactionDate):
        stockInfo = {}
        print('Getting Information on ticker {0}'.format(tickerId))
        dataOnThisStock = self.APICaller.getStockTrades(tickerId, fromTransactionDate, toTransactionDate)
        if len(dataOnThisStock) == 0:
            stockInfo[tickerId] = 'No Data Found'
        else:
            stockInfo[tickerId] = dataOnThisStock
        return stockInfo

    def getStatisticsOnPolitician(self, targetName, tickerId, fromTransactionDate, toTransactionDate):
        dateRegexPattern = r"^\d{4}-\d{2}-\d{2}$"
        if not re.match(dateRegexPattern, fromTransactionDate) or not re.match(dateRegexPattern, toTransactionDate):
            raise SyntaxError("Date is not in form: {0}".format('%Y-%m-%d'))
        politicianInfo = {}
        print('Getting Information on politician {0}'.format(targetName))
        dataOnThisPolitician = self.APICaller.getPoliticianTradesOnAStock(targetName, tickerId, fromTransactionDate, toTransactionDate)
        if len(dataOnThisPolitician) == 0:
            politicianInfo[targetName] = 'No Data Found'
        else:
            politicianInfo[targetName] = dataOnThisPolitician
        return politicianInfo

    def getAllPoliticianBuys(self, targetName, fromTransactionDate, toTransactionDate):
        dateRegexPattern = r"^\d{4}-\d{2}-\d{2}$"
        if not re.match(dateRegexPattern, fromTransactionDate) or not re.match(dateRegexPattern, toTransactionDate):
            raise SyntaxError("Date is not in form: {0}".format('%Y-%m-%d'))
        politicianInfo = {}
        print('Getting Information on politician {0}'.format(targetName))
        dataOnThisPolitician = self.APICaller.getPoliticianTradesOnAStock(targetName, tickerId, fromTransactionDate,
                                                                          toTransactionDate)
        if len(dataOnThisPolitician) == 0:
            politicianInfo[targetName] = 'No Data Found'
        else:
            politicianInfo[targetName] = dataOnThisPolitician
        return politicianInfo

