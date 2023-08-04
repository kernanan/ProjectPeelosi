import os
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)
from Domain.StockMarketTracker import StockMarketTracker
from Domain.TargetTracker import TargetTracker

def main():
    siteToSourceData = 'Finnhub'
    tracker = TargetTracker(siteToSourceData)
    dataOnTrackedPoliticians = tracker.getStatisticsOnPolitician('Mike Garcia', 'TSLA', '2023-05-01', '2023-06-21')
    print(dataOnTrackedPoliticians)
    dataOnTrackedStocks = tracker.getStatsticsOnStock('TSLA', '2023-05-01', '2023-06-21')
    print(dataOnTrackedStocks)

    siteToSourceStockMarketData = 'Darqube'
    marketTracker = StockMarketTracker(siteToSourceStockMarketData)
    print(marketTracker.getHistoricalData('TSLA', '2023-06-25', '2023-06-30'))

if __name__ == "__main__":
    main()
