angular.module('stockQuotesApp').service('appDataService', ['$firebaseObject', '$http', '$localStorage', '$state', function($firebaseObject, $http, $localStorage, $state){

    
    var service = this;
    // console.log('in app data service');


    service.version;
    service.accountCode;
    service.loading = false;
    service.brightTheme = $localStorage.brightTheme;
    if(service.brightTheme == undefined)
    {
        service.brightTheme = false;
    }


    service.firstLoad = false;

    service.accountValue = 0;
    service.allStockData;
    service.loserPercent;
    service.loserDollar;
    service.loserPrice;
    service.loserPositive = false;

    service.returningUser = false;
    service.submittedFirstStock = false;

    service.winnerPercent;
    service.winnerrDollar;
    service.winnerPrice;
    service.winnerNegative = false;

    service.allTickers = [];
    service.allShares = [];
    service.allInvestments = []

    service.dollarChanges = [];
    service.percentChanges = [];
    service.priceChanges = [];
    service.accountJustDeleted = false;

    service.data;

    service.stockCount = 0;

    service.currentState;
    service.accountValue;
    service.accountValueDollarChange = 0;
    service.accountValuePercentChange = 0;

    service.freshLoad = true;
    service.autoRefresh = true;
    service.marketsOpen;
    
    service.ref = new Firebase("https://coin-9681c.firebaseio.com");
    // // download the data into a local object
    service.data = $firebaseObject(service.ref);


    service.saveTheme = function(){
        if(service.brightTheme == true)
        {
            $localStorage.brightTheme = service.brightTheme;
        }
        else{
            $localStorage.brightTheme = service.brightTheme;
        }
    }


    service.accountCode = $localStorage.accountCode;

    if(service.accountCode == undefined)
    {
        service.accountCode = Math.floor(Math.random()*90000) + 10000;
        $localStorage.accountCode = service.accountCode;
        // console.log("Account Code: " + service.accountCode);
        // console.log(service.returningUser);
        // console.log(service.submittedFirstStock);

        $state.go('splash');
    }
    else{
        service.returningUser = true;
        $localStorage.returningUser = service.returningUser;

    }
    if($localStorage.submittedFirstStock == true)
    {
        service.submittedFirstStock = true;
    }


    






    //siteDataService.myVar = 'Evan';

}])