import re

from src.Data.BenzingaAPICaller import BenzingaAPICaller
from src.Data.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller
from src.Data.QuiverAPICaller import QuiverAPICaller
from src.Domain.UserPreferences import UserPreferences


class TargetTracker():

    def __init__(self, source):
        if source == 'Quiver':
            self.APICaller = QuiverAPICaller()
        elif source == 'Benzinga':
            self.APICaller = BenzingaAPICaller()
        elif source == 'HouseStockWatcherAPI':
            self.APICaller = HouseStockWatcherAPICaller()
        else:
            print('The Source you have entered is invalid. Defaulting to Benzinga.')
            self.APICaller = BenzingaAPICaller()
        self.users = {}

    def addTargetPoliticians(self, userId, targetName):
        pass

    def addTargetStocks(self, userId, tickerId):
        pass

    def getStatsticsOnStock(self, tickerId, fromTransactionDate, toTransactionDate):
        stockInfo = {}
        print('Getting Information on ticker {0}'.format(tickerId))
        dataOnThisStock = self.APICaller.getStockTrades(tickerId, fromTransactionDate, toTransactionDate)
        if len(dataOnThisStock) == 0:
            stockInfo[tickerId] = 'No Data Found'
        else:
            stockInfo[tickerId] = dataOnThisStock
        return stockInfo

    def getStatisticsOnPolitician(self, targetName, fromTransactionDate, toTransactionDate):
        dateRegexPattern = r"^\d{4}-\d{2}-\d{2}$"
        if not re.match(dateRegexPattern, fromTransactionDate) or not re.match(dateRegexPattern, toTransactionDate):
            raise SyntaxError("Date is not in form: {0}".format('%Y-%m-%d'))
        politicianInfo = {}
        print('Getting Information on politician {0}'.format(targetName))
        dataOnThisPolitician = self.APICaller.getPoliticianTrades(targetName, fromTransactionDate, toTransactionDate)
        if len(dataOnThisPolitician) == 0:
            politicianInfo[targetName] = 'No Data Found'
        else:
            politicianInfo[targetName] = dataOnThisPolitician
        return politicianInfo

    def alertWhenStockBoughtByTarget(self, fromDate, minimumShares, minimumCost):
        pass

    def alertWhenTargetsBuyStock(self, fromDate, toDate, minimumShares, minimumCost):
        pass