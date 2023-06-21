import requests

from src.Data.APICaller import APICaller
import xml.etree.ElementTree as ET


class HouseStockWatcherAPICaller(APICaller):
    def __init__(self):
        pass
    def getStockTrades(self, id):
        pass

    def alertWhenStockBoughtByTarget(self, id, fromDate, minimumShares, minimumCost):
        pass

    def alertWhenTargetsBuyStock(self, fromDate, toDate, minimumShares, minimumCost):
        fileNamesOfJSONs = self.getAllFiles()
        for i in range(0, 3):
            fileName = fileNamesOfJSONs.pop(i)
            getTransactionRequestByFileNameURL = 'https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/{0}'.format(fileName)
            print(getTransactionRequestByFileNameURL)
            headers = {'accept': 'application/json'}
            transactionData = self.requestJSONByURL(getTransactionRequestByFileNameURL, headers)

    def getAllFiles(self):
        url = 'https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/filemap.xml'
        try:
            response = requests.get(url)

            if response.status_code == 200:
                response_text = response.text
                xml = ET.fromstring(response_text)
                results = [key.text for key in xml.findall(".//Key") if '.json' in key.text]
                fileNamesOfJSONs = [file.split('/')[1] for file in results]
                return fileNamesOfJSONs
            else:
                print(f"API request failed with status code: {response.status_code}")

        except Exception as e:
            print(f"An error occurred: {str(e)}")