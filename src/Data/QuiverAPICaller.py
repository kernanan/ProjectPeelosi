from src.Data.APICaller import APICaller
import requests


class QuiverAPICaller(APICaller):

    def __init__(self):
        pass

    def getStockTrades(self, id):
        pass

    def alertWhenTargetsBuyStock(self, fromDate, toDate, minimumShares, minimumCost):
        pass

    def alertWhenStockBoughtByTarget(self, id, fromDate, minimumShares, minimumCost):
        pass

    def getCongressTrades(self):
        getHistoricalContressTradingByTickerURL = 'https://api.quiverquant.com/beta/historical/senatetrading/live/live/wikipedia'
        headers = {'accept': 'application/json',
                   'X-CSRFToken': 'TyTJwjuEC7VV7mOqZ622haRaaUr0x0Ng4nrwSRFKQs7vdoBcJlK9qjAS69ghzhFu',
                   'Authorization': 'Token {Your Authorization Token}'}