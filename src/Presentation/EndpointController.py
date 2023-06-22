from datetime import datetime, timedelta
from urllib.parse import unquote
from flask import Flask, request

from src.Domain.TargetTracker import TargetTracker

app = Flask(__name__)
siteToSourceData = 'Benzinga'
tracker = TargetTracker(siteToSourceData)

@app.route('/addTrackedPolitician')
def addTrackedPolitician():
    name = request.args.get('name')
    name = unquote(name)
    userId = request.args.get('userId')
    userId = unquote(userId)
    print(f'TODO: add {name} to user {userId}')
    return name

@app.route('/getTrackedPoliticians')
def getTrackedPoliticians():
    print('TODO: get tracked politicians')
    return 'TODO: get tracked politicians'

@app.route('/getPoliticianHistorical/<targetName>')
def getPoliticiansHistoricalTrades(targetName):
    if targetName is None:
        return 'No politician provided'
    fromDate = request.args.get('fromDate')
    toDate = request.args.get('toDate')
    if fromDate is None:
        fromDate = getTwoWeeksAgo()
    if toDate is None:
        toDate = getTodaysDate()
    print(f'Received Request for {targetName} trading history from {fromDate} to {toDate}')
    return tracker.getStatisticsOnPolitician(targetName, fromDate, toDate)

@app.route('/getStockHistorical/<tickerId>')
def getStockHistoricalTrades(tickerId):
    if tickerId is None:
        return 'No ticker provided'
    fromDate = request.args.get('fromDate')
    toDate = request.args.get('toDate')
    if fromDate is None:
        fromDate = getTwoWeeksAgo()
    if toDate is None:
        toDate = getTodaysDate()
    print(f'Received Request for {tickerId} trading history from {fromDate} to {toDate}')
    return tracker.getStatsticsOnStock(tickerId, fromDate, toDate)

@app.route('/')
def checkConnection():
    return 'Connection Successful!'

def getTodaysDate():
    today = datetime.today().strftime('%Y-%m-%d')
    return today

def getTwoWeeksAgo():
    twoWeeksAgo = datetime.today() - timedelta(weeks=2)
    formatted = twoWeeksAgo.strftime('%Y-%m-%d')
    return formatted


if __name__ == '__main__':
    app.run()