from src.Data.BenzingaAPICaller import BenzingaAPICaller


def main():
    print('Running program')
    benzinga = BenzingaAPICaller()
    benzinga.getGovernmentTrades()

if __name__ == "__main__":
    main()
