import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
from APICaller import APICaller


class BenzingaAPICaller(APICaller):

    def __init__(self):
        self.authToken = '7eefc01cb5184c1b92c984263ba0a476'

    def getStockTrades(self, tickerId, fromTransactionDate, toTransactionDate):
        getAllGovernmentTradesURL = 'https://api.benzinga.com/api/v1/gov/usa/congress/trades?token={0}'.format(
            self.authToken)
        headers = {'accept': 'application/json'}
        print(getAllGovernmentTradesURL)
        jsonData = self.requestJSONByURL(getAllGovernmentTradesURL, headers)
        dataEntriesFilteredByTicker = self.filterDataByTicker(tickerId, fromTransactionDate, toTransactionDate, jsonData)
        return dataEntriesFilteredByTicker

    def getPoliticianTradesOnAStock(self, politicianName, tickerId, fromTransactionDate, toTransactionDate):
        getAllGovernmentTradesURL = 'https://api.benzinga.com/api/v1/gov/usa/congress/trades?token={0}'.format(self.authToken)
        headers = {'accept': 'application/json'}
        print(getAllGovernmentTradesURL)
        jsonData = self.requestJSONByURL(getAllGovernmentTradesURL, headers)
        dataEntriesFilteredByPoliticianName = self.filterDataByPoliticianName(politicianName, fromTransactionDate, toTransactionDate, jsonData)
        return dataEntriesFilteredByPoliticianName

    def filterDataByTicker(self, tickerId, fromTransactionDate, toTransactionDate, jsonData):
        fromTransactionDate = self.convertDateStringIntoDateTime(fromTransactionDate)
        toTransactionDate = self.convertDateStringIntoDateTime(toTransactionDate)
        entries = []
        for data in jsonData['data']:
            if 'security' in data:
                if 'ticker' in data['security'] and data['security']['ticker'] == tickerId:
                    if 'transaction_date' in data:
                        transactionDate = self.convertDateStringIntoDateTime(data['transaction_date'])
                        if (fromTransactionDate < transactionDate) and (transactionDate < toTransactionDate):
                            entries.append(data)
        return entries

    def filterDataByPoliticianName(self, politicianName, fromTransactionDate, toTransactionDate, jsonData):
        fromTransactionDate = self.convertDateStringIntoDateTime(fromTransactionDate)
        toTransactionDate = self.convertDateStringIntoDateTime(toTransactionDate)
        entries = []
        for data in jsonData['data']:
            if 'filer_info' in data:
                if 'member_name' in data['filer_info'] and data['filer_info']['member_name'] == politicianName:
                    if 'transaction_date' in data:
                        transactionDate = self.convertDateStringIntoDateTime(data['transaction_date'])
                        if (fromTransactionDate < transactionDate) and (transactionDate < toTransactionDate):
                            entries.append(data)
        return entries


