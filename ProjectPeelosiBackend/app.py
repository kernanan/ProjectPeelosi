# from flask import Flask, jsonify, make_response
# app = Flask(__name__)
#
# @app.route("/")
# def hello_from_root():
#     return jsonify(message='Hello from root!')
#
#
# @app.route("/hello")
# def hello():
#     return jsonify(message='Hello from path!')
#
#
# @app.errorhandler(404)
# def resource_not_found(e):
#     return make_response(jsonify(error='Not found!'), 404)

from datetime import datetime, timedelta
from urllib.parse import unquote
from flask import Flask, jsonify, make_response, request

import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
from src.Domain.StockMarketTracker import StockMarketTracker
from src.Domain.TargetTracker import TargetTracker

app = Flask(__name__)
siteToSourcePoliticianData = 'Finnhub'
targetTracker = TargetTracker(siteToSourcePoliticianData)
siteToSourceStockMarketData = 'Darqube'
marketTracker = StockMarketTracker(siteToSourceStockMarketData)

@app.route('/getPoliticianHistoricalOnTicker/<targetName>/<tickerId>')
def getPoliticiansHistoricalTrades(targetName, tickerId):
    if targetName is None:
        return 'No politician provided'
    if tickerId is None:
        return 'No politician provided'
    fromDate = request.args.get('fromDate')
    toDate = request.args.get('toDate')
    if fromDate is None:
        fromDate = getTwoWeeksAgo()
    if toDate is None:
        toDate = getTodaysDate()
    print(f'Received Request for {targetName} trading history from {fromDate} to {toDate}')
    return targetTracker.getStatisticsOnPolitician(targetName, tickerId, fromDate, toDate)

@app.route('/getStockTradesHistorical/<tickerId>')
def getStockTradesHistorical(tickerId):
    if tickerId is None:
        return 'No ticker provided'
    fromDate = request.args.get('fromDate')
    toDate = request.args.get('toDate')
    if fromDate is None:
        fromDate = getTwoWeeksAgo()
    if toDate is None:
        toDate = getTodaysDate()
    print(f'Received Request for politicians\' {tickerId} trading history from {fromDate} to {toDate}')
    return targetTracker.getStatsticsOnStock(tickerId, fromDate, toDate)

@app.route('/getStockHistorical/<tickerId>')
def getStockHistorical(tickerId):
    if tickerId is None:
        return 'No ticker provided'
    fromDate = request.args.get('fromDate')
    toDate = request.args.get('toDate')
    if fromDate is None:
        fromDate = getTwoWeeksAgo()
    if toDate is None:
        toDate = getTodaysDate()
    print(f'Received Request for {tickerId} trading history from {fromDate} to {toDate}')
    return marketTracker.getHistoricalData(tickerId, fromDate, toDate)


@app.route("/")
def checkConnection():
    return jsonify(message='Connection Successful!')

@app.route("/hello")
def helloFromPath():
    return jsonify(message='Hello from Path')

def getTodaysDate():
    today = datetime.today().strftime('%m-%d-%Y')
    return today

def getTwoWeeksAgo():
    twoWeeksAgo = datetime.today() - timedelta(weeks=2)
    formatted = twoWeeksAgo.strftime('%m-%d-%Y')
    return formatted

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)


if __name__ == '__main__':
    app.run()