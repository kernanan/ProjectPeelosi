from src.Data.GeneralStockMarket.DarqubeAPICaller import DarqubeAPICaller


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
                return data
        except Exception as e:
            print("An exception occurred: ", repr(e))

