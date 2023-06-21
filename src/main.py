from src.Data.BenzingaAPICaller import BenzingaAPICaller
from src.Data.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller
from src.Domain.TargetTracker import TargetTracker


def main():
    siteToSourceData = 'Benzinga'
    tracker = TargetTracker(siteToSourceData)
    tracker.addTargetPoliticians('Mike Garcia')
    dataOnTrackedPoliticians = tracker.getStatisticsOnPoliticians()
    print(dataOnTrackedPoliticians)
    tracker.addTargetStocks('TSLA')
    dataOnTrackedStocks = tracker.getStatsticsOnStocks()
    print(dataOnTrackedStocks)

if __name__ == "__main__":
    main()
