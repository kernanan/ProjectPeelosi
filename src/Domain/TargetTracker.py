import re

from src.Data.BenzingaAPICaller import BenzingaAPICaller
from src.Data.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller
from src.Data.QuiverAPICaller import QuiverAPICaller


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
        self.targetPoliticians = {}
        self.targetStocks = {}
        self.timers = {'Stock': '', 'Politician': ''}
        self.stockNotificationsOn = False
        self.politicianNotificiationsOn = False

    def addTargetPoliticians(self, targetName):
        self.targetPoliticians[str(targetName)] = True

    def addTargetStocks(self, tickerId):
        self.targetStocks[str(tickerId)] = True

    def getStatsticsOnStocks(self, fromTransactionDate, toTransactionDate):
        stockInfo = {}
        for stock in self.targetStocks:
            print('Getting Information on ticker {0}'.format(stock))
            dataOnThisStock = self.APICaller.getStockTrades(stock, fromTransactionDate, toTransactionDate)
            if len(dataOnThisStock) == 0:
                stockInfo[stock] = 'No Data Found'
            else:
                stockInfo[stock] = dataOnThisStock
        return stockInfo

    def getStatisticsOnPoliticians(self, fromTransactionDate, toTransactionDate):
        dateRegexPattern = r"^\d{4}-\d{2}-\d{2}$"
        if not re.match(dateRegexPattern, fromTransactionDate) or not re.match(dateRegexPattern, toTransactionDate):
            raise SyntaxError("Date is not in form: {0}".format('%Y-%m-%d'))
        politicianInfo = {}
        for target in self.targetPoliticians:
            print('Getting Information On Politician {0}'.format(target))
            dataOnThisPolitician = self.APICaller.getPoliticianTrades(target, fromTransactionDate, toTransactionDate)
            if len(dataOnThisPolitician) == 0:
                politicianInfo[target] = 'No Data Found'
            else:
                politicianInfo[target] = dataOnThisPolitician
        return politicianInfo