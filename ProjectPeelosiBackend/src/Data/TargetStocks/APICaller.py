import json
from abc import ABC, abstractmethod
from datetime import datetime

import requests


class APICaller(ABC):
    @abstractmethod
    def getStockTrades(self, tickerId, fromTransactionDate, toTransactionDate):
        pass
    @abstractmethod
    def getPoliticianTrades(self, politicianName, fromTransactionDate, toTransactionDate):
        pass

    def requestJSONByURL(self, url, headers):
        response = requests.get(url, headers=headers)
        json_obj = response.content
        data = json.loads(json_obj)
        return data

    def convertDateStringIntoDateTime(self, datestring):
        datetime_obj = datetime.strptime(datestring, "%Y-%m-%d")
        return datetime_obj