import json
from abc import ABC, abstractmethod

import requests


class APICaller(ABC):

    @abstractmethod
    def getStockStatistics(self, id):
        pass

    @abstractmethod
    def alertWhenStockBoughtByTarget(self, id, fromDate, minimumShares, minimumCost):
        pass

    @abstractmethod
    def alertWhenTargetsBuyStock(self, fromDate, toDate, minimumShares, minimumCost):
        pass

    def requestJSONByURL(self, url, headers):
        response = requests.get(url, headers=headers)
        json_obj = response.content
        data = json.loads(json_obj)
        return data