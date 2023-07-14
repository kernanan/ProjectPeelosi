class UserPreferences():
    def __init__(self, userId):
        self.userId = userId
        self.targetPoliticians = {}
        self.targetStocks = {}
        self.alertTimer = ''
        self.notifyWhenStockIsBought = False
        self.notifyWhenTargetBuysStock = False