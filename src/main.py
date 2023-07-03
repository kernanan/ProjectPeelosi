from src.Domain.StockMarketTracker import StockMarketTracker
from src.Domain.TargetTracker import TargetTracker


def main():
    siteToSourceData = 'Benzinga'
    tracker = TargetTracker(siteToSourceData)
    dataOnTrackedPoliticians = tracker.getStatisticsOnPolitician('Mike Garcia', '2023-05-01', '2023-06-21')
    print(dataOnTrackedPoliticians)
    dataOnTrackedStocks = tracker.getStatsticsOnStock('TSLA', '2023-05-01', '2023-06-21')
    print(dataOnTrackedStocks)

    siteToSourceStockMarketData = 'Darqube'
    marketTracker = StockMarketTracker(siteToSourceStockMarketData)
    print(marketTracker.getHistoricalData('TSLA', '2023-06-25', '2023-06-30'))

if __name__ == "__main__":
    main()
