from src.Data.BenzingaAPICaller import BenzingaAPICaller
from src.Data.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller
from src.Domain.TargetTracker import TargetTracker


def main():
    siteToSourceData = 'Benzinga'
    tracker = TargetTracker(siteToSourceData)
    dataOnTrackedPoliticians = tracker.getStatisticsOnPolitician('Mike Garcia', '2023-05-01', '2023-06-21')
    print(dataOnTrackedPoliticians)
    dataOnTrackedStocks = tracker.getStatsticsOnStock('TSLA', '2023-05-01', '2023-06-21')
    print(dataOnTrackedStocks)

if __name__ == "__main__":
    main()
