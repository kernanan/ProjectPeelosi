from src.Data.APICaller import APICaller


class BenzingaAPICaller(APICaller):

    def __init__(self):
        self.authToken = '7eefc01cb5184c1b92c984263ba0a476'

    def getStockStatistics(self, tickerId):
        getAllGovernmentTradesURL = 'https://api.benzinga.com/api/v1/gov/usa/congress/trades?token={0}'.format(
            self.authToken)
        headers = {'accept': 'application/json'}
        print(getAllGovernmentTradesURL)
        jsonData = self.requestJSONByURL(getAllGovernmentTradesURL, headers)
        dataEntriesFilteredByTicker = self.filterDataByTicker(tickerId, jsonData)
        return dataEntriesFilteredByTicker

    def alertWhenStockBoughtByTarget(self, id, fromDate, minimumShares, minimumCost):
        pass

    def alertWhenTargetsBuyStock(self, fromDate, toDate, minimumShares, minimumCost):
        pass

    def getGovernmentTrades(self):
        getAllGovernmentTradesURL = 'https://api.benzinga.com/api/v1/gov/usa/congress/trades?token={0}'.format(self.authToken)
        headers = {'accept': 'application/json'}
        print(getAllGovernmentTradesURL)
        jsonData = self.requestJSONByURL(getAllGovernmentTradesURL, headers)
        print(jsonData)

    def filterDataByTicker(self, tickerId, jsonData):
        entries = []
        for data in jsonData['data']:
            if 'security' in data:
                if 'ticker' in data['security'] and data['security']['ticker'] == tickerId:
                    entries.append(data)
        return entries


