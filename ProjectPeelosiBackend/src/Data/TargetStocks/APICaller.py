import json
from abc import ABC, abstractmethod
from datetime import datetime

import requests


class APICaller(ABC):
    @abstractmethod
    def getStockTrades(self, tickerId, fromTransactionDate, toTransactionDate):
        pass
    @abstractmethod
    def getPoliticianTradesOnAStock(self, politicianName, tickerId, fromTransactionDate, toTransactionDate):
        pass

    def requestJSONByURL(self, url, headers):
        response = requests.get(url, headers=headers)
        json_obj = response.content
        data = json.loads(json_obj)
        return data

    def convertDateStringIntoDateTime(self, datestring):
        datetime_obj = datetime.strptime(datestring, "%m-%d-%Y")
        return datetime_obj