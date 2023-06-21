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

    def getStatisticsOnPoliticians(self):
        for target in self.targetPoliticians:
            print(target)

    def addTargetStocks(self, tickerId):
        self.targetStocks[str(tickerId)] = True

    def getStatsticsOnStocks(self):
        stockInfo = {}
        for stock in self.targetStocks:
            print('Getting Information on ticker {0}'.format(stock))
            dataOnThisStock = self.APICaller.getStockStatistics(stock)
            if len(dataOnThisStock) == 0:
                stockInfo[stock] = 'No Data Found'
            else:
                stockInfo[stock] = dataOnThisStock
        return stockInfo

