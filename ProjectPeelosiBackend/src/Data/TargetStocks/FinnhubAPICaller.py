import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
from APICaller import APICaller


def convertMDY(param):
    conv = "-".join(param.split("-")[::-1])
    return conv


def convertYMD(param):
    return param


class FinnhubAPICaller(APICaller):

    def __init__(self):
        self.authToken = 'cj006i1r01qlkaevun50cj006i1r01qlkaevun5g'

    def getStockTrades(self, tickerId, fromTransactionDate, toTransactionDate):
        getStockTradesURL = 'https://finnhub.io/api/v1/stock/insider-transactions?symbol={0}&token={1}'.format(tickerId, self.authToken)
        finnData = self.requestJSONByURL(getStockTradesURL, {'X-Finnhub-Token': self.authToken,
                                                             'accept': 'application/json'})
        formattedData = {}
        fromTransactionDate = convertMDY(fromTransactionDate)
        for data in finnData['data']:
            if 'transactionDate' in data:
                if data["transactionDate"] >= fromTransactionDate:
                    formattedData[data["transactionDate"]] = data
                else:
                    break
        print(getStockTradesURL)
        print(formattedData)
        return formattedData

    def getPoliticianTradesOnAStock(self, politicianName, tickerId, fromTransactionDate, toTransactionDate):
        getStockTradesURL = 'https://finnhub.io/api/v1/stock/insider-transactions?symbol={0}&token={1}'.format(tickerId, self.authToken)
        finnData = self.requestJSONByURL(getStockTradesURL, {'X-Finnhub-Token': self.authToken,
                                                             'accept': 'application/json'})
        fromTransactionDate = convertMDY(fromTransactionDate)
        formattedData = {}
        for data in finnData['data']:
            if 'transactionDate' in data and 'name' in data:
                if data['transactionDate'] >= fromTransactionDate:
                    name = data['name']
                    date = data['transactionDate']
                    if name not in formattedData:
                        formattedData[name] = {}
                    formattedData[name][date] = data
                else:
                    break
        print(formattedData)
        return formattedData

if __name__ == '__main__':
    caller = FinnhubAPICaller()
    caller.getStockTrades('TSLA', '07-06-2023', '07-31-2023')
    caller.getPoliticianTradesOnAStock('Taneja Vaibhav', 'TSLA', '06-06-2023', '07-31-2023')

