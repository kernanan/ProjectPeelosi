from abc import ABC, abstractmethod
import json
from datetime import datetime

import requests

class StockMarketAPICaller(ABC):
    @abstractmethod
    def getHistoricalStockData(self, tickerId, fromDate, toDate):
        pass

    @abstractmethod
    def reformatToStandard(self, historicalData):
        pass

    def requestJSONByURL(self, url, headers):
        response = requests.get(url, headers=headers)
        json_obj = response.content
        data = json.loads(json_obj)
        return data

    def convertDateStringIntoDateTime(self, datestring):
        datetime_obj = datetime.strptime(datestring, "%m-%d-%Y")
        return datetime_obj