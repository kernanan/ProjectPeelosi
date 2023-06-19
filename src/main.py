from src.Data.BenzingaAPICaller import BenzingaAPICaller
from src.Data.HouseStockWatcherAPICaller import HouseStockWatcherAPICaller


def main():
    # print('Running program')
    # house = HouseStockWatcherAPICaller()
    # house.alertWhenTargetsBuyStock('sdf', 'sdf', 'sdf', 'sdf')

    benzinga = BenzingaAPICaller()
    benzinga.getGovernmentTrades()

if __name__ == "__main__":
    main()
