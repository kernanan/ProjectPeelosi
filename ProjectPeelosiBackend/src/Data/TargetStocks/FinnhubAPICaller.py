import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
from APICaller import APICaller

class FinnhubAPICaller(APICaller):

    def __init__(self):
        self.authToken = 'cj006i1r01qlkaevun50cj006i1r01qlkaevun5g'

    def getStockTrades(self, tickerId, fromTransactionDate, toTransactionDate):
        getStockTradesURL = 'https://finnhub.io/api/v1/stock/insider-transactions?symbol=TSLA?token={0}'.format(self.authToken)


    def getPoliticianTrades(self, politicianName, fromTransactionDate, toTransactionDate):
        pass