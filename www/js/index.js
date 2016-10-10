var app = angular.module('ionicApp', ['ionic','ngTouch','confApp','utilsApp','fakedataApp']);

/**
 * Se true, utilizza i fake data presenti nel modulo fakedata.js
 *
 * **/

var FAKEDATAURL = false;
var FAKEDATADASH = false;
var FAKEDATADETAIL = false;


/**
 * Inizializza del profilo dell'utente (lingua, abidtudini alimentari, allergeni, etc.)
 * @param $scope
 * @param controller
 */

var initObjects = function($scope, controller) {
    controller.langApp = { name: "Italiano", id: 'it'};
    controller.classeCal = { name: "2000", id: 'f1', value:"2000"};
    controller.abitudine = [];
    //controller.tipo = [];
    controller.allergie = [];
    controller.enabledToggles = [];

    for (i=0; i<$scope.list_abitudine.length; i++) {
        controller.abitudine.push(false);
        controller.enabledToggles.push(-1);
    }

    for (i=0; i<$scope.list_allergie.length; i++) {
        controller.allergie.push(false);
        controller.enabledToggles.push(-1);
    }

    /*for (i=0; i<$scope.list_tipo.length; i++) {
     controller.tipo.push(true);
     controller.enabledToggles.push($scope.list_tipo[i].siteCode);
     //controller.enabledToggles.push(-1);
     }*/

    window.localStorage.setItem("langApp",  JSON.stringify(controller.langApp));
    window.localStorage.setItem("classeCal",  JSON.stringify(controller.classeCal));
    window.localStorage.setItem("abitudine",  JSON.stringify(controller.abitudine));
    //window.localStorage.setItem("tipo",  JSON.stringify(controller.tipo));
    window.localStorage.setItem("allergie",  JSON.stringify(controller.allergie));
    window.localStorage.setItem("toggles",  JSON.stringify(controller.enabledToggles));
    console.log("Inizializzazione profilo utente " + controller.enabledToggles);
};

/**
 *
 *
 *
 */

app.run(function($ionicPlatform, $ionicPopup, $state,$rootScope, $ionicLoading) {

    $ionicPlatform.ready(function () {

        // Gestione back button
        $ionicPlatform.registerBackButtonAction(function (event) {
            if($state.current.name=="eventmenu.home"){
                navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        /* Gestione dell'animazione della transizione tra pagine */
        // then override any default you want
        window.plugins.nativepagetransitions.globalOptions.duration = 500;
        window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
        window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
        window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
        window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
        // these are used for slide left/right only currently
        window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
        window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
    });

    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: "Caricamento....",
            showBackdrop: true
        })
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    });

    $rootScope.$on('$locationChangeStart', function($event, changeTo, changeFrom) {

        var pagenameFrom = changeFrom.replace(/^.*[\\\/]/, '');
        var pagenameTo = changeTo.replace(/^.*[\\\/]/, '');

        /*
         if (pagenameFrom =='index.html'){
         window.localStorage.setItem("reloadHome",'0');
         window.localStorage.setItem("reloadList",'0');
         window.localStorage.setItem("reloadDetail",'0');
         window.localStorage.setItem("reloadProject",'0');
         }

         if (changeTo == changeFrom) {
         return;
         }

         if (window.localStorage.getItem("reloadHome")<'2' && pagenameTo =='home'){
         window.location.assign(pagenameTo);
         window.location.reload(true);
         //window.localStorage.setItem("reloadHome",'0');
         }
         else window.location = changeTo;

         if (window.localStorage.getItem("reloadList")<'2' && pagenameTo =='product_list'){
         window.location.assign(pagenameTo);
         window.location.reload(true);
         //window.localStorage.setItem("reloadList",'0');
         }
         else window.location = changeTo;

         if (window.localStorage.getItem("reloadDetail")<'2' && pagenameTo =='product1'){
         window.location.assign(pagenameTo);
         window.location.reload(true);
         //window.localStorage.setItem("reloadDetail",'0');
         }
         else window.location = changeTo;

         if (window.localStorage.getItem("reloadProject")<'2' && pagenameTo =='progetto'){
         window.location.assign(pagenameTo);
         window.location.reload(true);
         //window.localStorage.setItem("reloadProject",'0');
         }
         else window.location = changeTo;
         */
    });

});


/**
 * Configurazione del menu
 */
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('eventmenu', {
            url: "/event",
            abstract: true,
            templateUrl: "templates/event-menu.html"
        })
        .state('eventmenu.home', {
            url: "/home",
            views: {
                'menuContent' :{
                    templateUrl: "templates/home.html"
                }
            }
        })
        .state('eventmenu.product_list', {
            url: "/product_list",
            views: {
                'menuContent' :{
                    templateUrl: "templates/product_list.html"
                }
            }
        })
        .state('eventmenu.personalizza', {
            url: "/personalizza",
            views: {
                'menuContent' :{
                    templateUrl: "templates/personalizza.html"
                }
            }
        })
        .state('eventmenu.help', {
            url: "/help",
            views: {
                'menuContent' :{
                    templateUrl: "templates/help.html"
                }
            }
        })
        .state('eventmenu.progetto', {
            url: "/progetto",
            views: {
                'menuContent' :{
                    templateUrl: "templates/progetto.html"
                }
            }
        })
        .state('eventmenu.product1', {
            url: "/product1",
            views: {
                'menuContent' :{
                    templateUrl: "templates/page1-prodotto.html"
                }
            }
        })
        .state('eventmenu.product2', {
            url: "/product2",
            views: {
                'menuContent' :{
                    templateUrl: "templates/page2-ingredienti.html"
                }
            }
        })
        .state('eventmenu.product3', {
            url: "/product3",
            views: {
                'menuContent' :{
                    templateUrl: "templates/page3-allergie.html"
                }
            }
        })

    $urlRouterProvider.otherwise("/event/home");

});


/**
 * Controller del menu
 */
app.controller ('MenuCtrl', function($scope, configService, labelService, barcodeProductService, fakedataService){
    $scope.labels = labelService.getLabels(getLanguage());
    $scope.openScanner = function () {
        barcodeProductService.getScan();
    };
});


/**
 * Controller della pagina statica Progetto
 */
app.controller ('ProgettoCtrl', function($scope, configService, labelService){
    $scope.lang = getLanguage();
    $scope.labels = labelService.getLabels(getLanguage());
});

/**
 * Controller della pagina statica Help/Guida
 */
app.controller ('HelpController', function($scope, labelService){
    $scope.lang = getLanguage();
    $scope.labels = labelService.getLabels(getLanguage());
    $scope.openPersonalizzaPage = function(nid) {
        window.location="#/event/personalizza";
    };
});

/**
 * Controller della Home dell'app
 */
app.controller('MainCtrl', function($scope, $window, $http, configService, barcodeProductService, labelService, fakedataService) {

    //Al primo avvio dell'app faccio un redirect alla guida
    if( (localStorage.getItem("firstRun") === null) || !localStorage.getItem("firstRun") ) {
        window.location="#/event/help";
    }
    var urlToCall = "";
    var productsVr = [];
    var productsHr = [];
    var config = configService.getHeaderConfig();

    $scope.labels = labelService.getLabels(getLanguage());

    if (FAKEDATADASH){
        var data = fakedataService.getFakedataDashboardVr();
        data = fixDataImagesAndHtmlSpecialEntities(data,'prodotto',labelService);
        productsVr.push.apply(productsVr, data);
        $scope.productsVr = productsVr;
        var data = fakedataService.getFakedataDashboardHr();
        data = fixDataImagesAndHtmlSpecialEntities(data,'prodotto',labelService);
        productsHr.push.apply(productsHr, data);
        $scope.productsHr = productsHr;

    }
    else {
        /**
         * Chiamata del servizio per i prodotti con immagine verticale
         */
        urlToCall = configService.getDashboardVrUrl();
        console.log("Calling url.." + urlToCall);
        $http
            .get(urlToCall, config)
            .success(function (data) {
                data = fixDataImagesAndHtmlSpecialEntities(data,'prodotto',labelService);
                productsVr.push.apply(productsVr, data);
                $scope.productsVr = productsVr;
            })
            .error(function () {
                console.log("Error calling service (2Vr): " + urlToCall);
            })

        /**
         * Chiamata del servizio per i prodotti con immagine orizzontale
         */
        urlToCall = configService.getDashboardHrUrl();
        console.log("Calling url.." + urlToCall);
        $http
            .get(urlToCall, config)
            .success(function (data) {
                data = fixDataImagesAndHtmlSpecialEntities(data,'prodotto',labelService);
                productsHr.push.apply(productsHr, data);
                $scope.productsHr = productsHr;

            })
            .error(function () {
                console.log("Error calling service (2Hr): " + urlToCall);
            })

    }

    $scope.openProductPage = function(nid) {
        window.localStorage.setItem("product_nid", nid);
        window.location = "#/event/product1";
    };

    $scope.openBarcodeScanner = function () {
        barcodeProductService.getScan();
    };

    $scope.onSwipe = function (gesture) {
        switch (gesture) {
            case 'left': window.location = "#/event/product_list";
                break;
            default:
                break;
        }
    };
});

/**
 * Controller per il salvataggio del profilo dell'utente
 */
app.controller('SavePreferencesCtrl', function($scope, $window, $ionicHistory,  configService, labelService, personalizzaService) {

    var save = this;
    $scope.labels = labelService.getLabels(getLanguage());
    $scope.labelsTax = labelService.getTaxLabels(getLanguage());

    $scope.list_lang = [
        { name: "Italiano", id: 'it'},
        { name: "English", id: 'en'}
    ];

    $scope.lista_classeCal = [
        { name: "1800 - Bambino", id: 'f0', value: "1800"},
        { name: "2000 - Donna", id: 'f1', value: "2000"},
        { name: "2500 - Uomo", id: 'f2', value: "2500"}
    ];

    $scope.abitEnabled = [];
    $scope.abitEnabled[0] = true;
    $scope.abitEnabled[1] = true;

    $scope.list_abitudine = personalizzaService.getListAbitudine();
    $scope.list_allergie = personalizzaService.getListAllergie();

    //$scope.list_tipo = personalizzaService.getListTipo();


    $scope.openHomepage = function(){
        console.log ("Here");
        window.location = "#/event/home";
    };

    $scope.activity = [];
    $scope.selectedChange = function(item) {
        var msg = item.value;
        msg += (item.selected ? ' selected, ' : ' de-selected, ');
        msg += new Date().getMilliseconds();
        $scope.activity.push(msg);
        if($scope.activity.length > 3) {
            $scope.activity.splice(0, 1);
        }
    };

    if( (localStorage.getItem("firstRun") === null) || !localStorage.getItem("firstRun") ) {
        initObjects($scope, save);
        localStorage.setItem("firstRun", true);
    }

    // Ripristino dei toggle settati dall'utente in una sessione precedente.
    try {
        save.abitudine = JSON.parse(window.localStorage["abitudine"]);
        //save.tipo = JSON.parse(window.localStorage["tipo"]);
        save.allergie = JSON.parse(window.localStorage["allergie"]);
        save.enabledToggles = JSON.parse(window.localStorage["toggles"]);
        save.classeCal = JSON.parse(window.localStorage["classeCal"]);
        save.langApp = JSON.parse(window.localStorage["langApp"]);
        if (save.abitudine[0]==false){
            $scope.abitEnabled[0] = false;
            $scope.abitEnabled[1] = true;
        }
        else {
            $scope.abitEnabled[0] = false;
            $scope.abitEnabled[1] = false;
        }
    } catch (e) {
        console.log("Error during recovering toggles state" + e);
    }

    save.updateLang = function () {
        window.localStorage.setItem("langApp", JSON.stringify(save.langApp));
        $ionicHistory.clearCache();
        window.location.reload(true);
        console.log("Valore lang : " + window.localStorage.getItem("langApp"));
    }

    save.updateClasseCal = function () {
        window.localStorage.setItem("classeCal", JSON.stringify(save.classeCal));
        $ionicHistory.clearCache();
        window.location.reload(true);
        //console.log("Valore classe : " + window.localStorage.getItem("classeCal"));
    }

    save.updateAbitudine = function (item) {
        window.localStorage.setItem("abitudine",  JSON.stringify(save.abitudine));
        //console.log("Saved item " + item.appCode + " - SiteCode = " + item.siteCode);

        if (save.abitudine[item.appCode]) {
            save.enabledToggles[item.appCode] = item.siteCode;
        } else {
            save.enabledToggles[item.appCode] = -1;
        }

        if (save.abitudine[0]==false){
            $scope.abitEnabled[0] = false;
            $scope.abitEnabled[1] = true;
        }
        else {
            $scope.abitEnabled[0] = false;
            $scope.abitEnabled[1] = false;
        }

        // Salvataggio degli id dei toggle abilitati dall'utente, in modo da ripristinarli in utilizzi successivi dell'app.
        window.localStorage.setItem("toggles", JSON.stringify(save.enabledToggles));

        console.log("MEM" + window.localStorage);
        console.log("Salvataggio avvenuto. enabledToggles aggiornato: " + save.enabledToggles);

        $ionicHistory.clearCache();
    };

    save.updateAllergie = function (item) {
        window.localStorage.setItem("allergie", JSON.stringify(save.allergie));
        console.log("Saved item = " + item.appCode + " - SiteCode = " + item.siteCode);

        if (save.allergie[item.appCode-save.abitudine.length]) {
            save.enabledToggles[item.appCode] = item.siteCode;
        } else {
            save.enabledToggles[item.appCode] = -1;
        }

        $ionicHistory.clearCache();

        // Salvataggio degli id dei toggle abilitati dall'utente, in modo da ripristinarli in utilizzi successivi dell'app.
        window.localStorage.setItem("toggles", JSON.stringify(save.enabledToggles));

    };


});


/** Loading **/
app.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response
            }
        }
    })
});


/**
 * Apre il lettore di codici a barre ed effettua la scansione
 **/
app.factory('barcodeProductService',  function ($http, $q, $cacheFactory, $window, configService) {

    var config = configService.getHeaderConfig();

    return {
        getScan: function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {

                    if (result.text.length>1){
                        var deferred = $q.defer();
                        var urlToCall ="";

                        urlToCall = configService.getDetailBarcodeUrl() + result.text + '&lang=' + getLanguage();
                        console.log("Calling service .. " + urlToCall);
                        $http
                            .get(urlToCall, config)
                            .success(function (data) {
                                //if (productId === null) {
                                product = JSON.parse(JSON.stringify(data));
                                if (product.length>0)
                                {
                                    window.localStorage.setItem("product_nid", product[0].nid);
                                    window.location = "#/event/product1";
                                    deferred.resolve(product);
                                }
                                else {
                                    alert ("Prodotto non presente nella banca dati.");
                                    window.location = "#/event/home";
                                }
                            })
                            .error(function (data) {
                                alert("Error calling service .." + urlToCall);
                                deferred.reject(data);
                            });

                    }
                    else {
                        window.location = "#/event/home";
                    }

                },
                function (error) {
                    alert("Errore durante la scansione: " + error);
                });
        }
    };
});

function openProductList(){
    window.location = "#/event/product_list";
}

function getLanguage(){
    var lang = JSON.parse(window.localStorage.getItem("langApp"));

    if (lang)
        return lang.id;
    else
        return "it";
}


function getClasseCal(){
    var classSelected = JSON.parse(window.localStorage.getItem("classeCal"));
    return classSelected.value;
}

/**
 *
 * @param $http
 * @param configService
 * @param labelService
 * @param fakedataService
 * @returns {Array}
 */
var filteredProducts = function ($http,configService,labelService,fakedataService) {
    var urlToCall = "";
    var products = [];
    var config = configService.getHeaderConfig();
    var originalData = angular.copy(products);

    /*if (FAKEDATAURL){
     var data = fakedataService.getFakedataList();
     data = fixDataImagesAndHtmlSpecialEntities(data,'prodotto',labelService);
     products.push.apply(products, data);
     }
     else {*/

    return {

        GetFirstProducts: function($chiave_titolo, $categories_ind){
            urlToCall = configService.getRicercaUrl(null);
            urlToCall =  configService.getRicercaUrl($categories_ind);

            if ($chiave_titolo)
                urlToCall += '&title='+$chiave_titolo;

            urlToCall = urlToCall + "&offset=0";
            console.log("Calling url .." + urlToCall);
            $http
                .get(urlToCall, config)
                .success(function (data) {
                    data = fixDataImagesAndHtmlSpecialEntities(data, 'prodotto',labelService);
                    angular.copy(originalData, products);
                    products.push.apply(products, data);

                })
                .error(function (data) {
                    console.log("Error calling service (3): " + urlToCall);
                });
            return products;
        },

        GetOtherProducts: function($chiave_titolo, $categories_ind,listoffset) {
            urlToCall = configService.getRicercaUrl(null);
            urlToCall =  configService.getRicercaUrl($categories_ind);
            if ($chiave_titolo)
                urlToCall += '&title='+$chiave_titolo;
            urlToCall = urlToCall + "&offset="+listoffset;

            if (window.localStorage.getItem("last_url"))
                if (window.localStorage.getItem("last_url") == urlToCall)
                    console.log ("REPEAT");

            console.log("Calling url .." + urlToCall);
            return $http
                .get(urlToCall, config)
                .success(function (data) {
                    window.localStorage.setItem("last_url", urlToCall);
                    data = fixDataImagesAndHtmlSpecialEntities(data, 'prodotto',labelService);
                    //angular.copy(originalData, products);
                    products.push.apply(products, data);
                    return products;
                })
                .error(function (data) {
                    console.log("Error calling service (3): " + urlToCall);
                });
        }
    }
    //}
};


/**
 * Factory per la ricerca di prodotti tramite parole chiave inserite dall'utente
 */
/*
app.factory('productSearch', function($http,configService, labelService) {
    var urlToCall = "";
    var products = [];
    var originalData = angular.copy(products);
    var config = configService.getHeaderConfig();

    return {
        products: products,

        search: function ($chiave_titolo,$categories_ind) {
            urlToCall =  configService.getRicercaUrl($categories_ind);
            if ($chiave_titolo)
                urlToCall += '&title='+$chiave_titolo;

            console.log ("Calling url.." + urlToCall);
            $http
                .get(urlToCall, config)
                .success(function (data) {
                    data = fixDataImagesAndHtmlSpecialEntities(data,'prodotto',labelService);
                    // Evita duplicati nella ricerca
                    angular.copy(originalData, products);
                    products.push.apply(products, data);

                })
                .error(function (data) {
                    alert("Error calling service .. " + urlToCall );
                });
        }
    };

});
§*/

app.factory( 'filteredProductsFactory', filteredProducts );

app.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response
            }
        }
    })
});

/**
 * Service per l'estensione della ricerca alla categoria
 *
 */
app.service('checkCategories', function($http,configService, personalizzaService) {
    var categories = [];

    this.getCategories = function ($chiave_titolo) {
        var categories = [];
        categories = personalizzaService.getTipoByName($chiave_titolo);
        return categories;
    }

});


/**
 *  Funzione per:
 * 1) inserire il campo src nel campo field_immagine_anteprima di ogni prodotto.
 * 2) eliminare i caratteri html special entities dal titolo e dal nome del produttore.
 * @param data
 * @param $tipo
 * @param labelService
 * @returns {*}
 */

var fixDataImagesAndHtmlSpecialEntities = function(data,$tipo, labelService) {

    for (var i=0; i<data.length; i++) {

        var item = data[i];
        var img_src;
        var elem = document.createElement("div");

        // Gestione campo src dell'immagine
        if ($tipo == 'prodotto'){
            img_src = item.field_immagine_copertina;
            elem.innerHTML = img_src;
            var img = elem.getElementsByTagName("img");
            if (img.length>0){
                data[i].field_immagine_copertina = img[0].src;
            }
            else{
                data[i].field_immagine_copertina.push('nd');
            }
        }

        if ($tipo == 'ricetta'){
            img_src = item.field_immagine_ricetta;
            elem.innerHTML = img_src;
            var img = elem.getElementsByTagName("img");
            if (img.length>0){
                data[i].field_immagine_ricetta = img[0].src;
            }
            else{
                data[i].field_immagine_ricetta.push('nd');
            }
        }

        // Eliminazione delle html special entities dal titolo del prodotto
        var title = document.createElement("textarea");
        title.innerHTML = item.title;
        data[i].title = title.value;

        // Eliminazione delle html special entities dal produttore del prodotto
        var prod = document.createElement("textarea");
        prod.innerHTML = item.field_produttore;
        data[i].field_produttore = prod.value;

        if (getLanguage() == 'en') {
            if (data) {
                if (data[i].field_tipologia)
                    data[i].field_tipologia = labelService.translateTax(data[i].field_tipologia);
            }
        }
    }

    return data;
};

/**
 *
 * Controller lista prodotti. Gestisce il caricamento della lista prodotti completa, filtrata per parametri settati dall'utente e la ricerca prodotto.
 *
 */
app.controller('ProductListController', function ($scope, $http,  $window, filteredProductsFactory, configService, labelService, checkCategories) {

    $scope.labels = labelService.getLabels(getLanguage());
    $scope.ricercaUrl = configService.getRicercaUrl(null);
    $scope.products = [];
    $scope.listoffset = 0;
    $scope.products = filteredProductsFactory.GetFirstProducts();

    $scope.canWeLoadMoreProducts = function() {
        $endoflist = $scope.products.length % 10;
        console.log ("SCOPE..." + $scope.products.length);
        console.log ("EOList..." + $endoflist);

        if ($endoflist == 0 && !$scope.stopLoad) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.loadMore = function() {
        $scope.listoffset = $scope.listoffset + 10;
        console.log ("$scope.listoffset " + $scope.listoffset );
        if ($scope.prod)
        {
            if ($scope.prod.title.length>2) {
                $codCat = checkCategories.getCategories($scope.prod.title);
                filteredProductsFactory.GetOtherProducts($scope.prod.title,$codCat,$scope.listoffset).then(function(products){
                    $scope.products.push.apply($scope.products, products);
                    if (products.data.length==0){
                        $scope.stopLoad = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }
            if ($scope.prod.title.length==0) {
                filteredProductsFactory.GetOtherProducts(false, false,$scope.listoffset).then(function(products){
                    $scope.products.push.apply($scope.products, products);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }
        }
        else {
            filteredProductsFactory.GetOtherProducts(false, false,$scope.listoffset).then(function(products) {
                    $scope.products.push.apply($scope.products, products);
                    $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }
    };

    $scope.doRefresh = function() {
        //$scope.products = filteredProducts;
        if ($scope.prod)
            $scope.prod.title = "";
        $scope.products = [];
        $scope.listoffset = 0;
        $scope.stopLoad = false;
        $scope.products = filteredProductsFactory.GetFirstProducts();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
    };

    /* Gestione del click su singolo elemento della lista */
    $scope.openProductPage = function(nid) {
        window.localStorage.setItem("product_nid", nid);
        window.location = "#/event/product1";
    };

    /* Gestione ricerca */
    $scope.searchProduct = function() {
        //$scope.products = productSearch.products;
        $scope.products = [];
        //$scope.products = filteredProductsFactory.GetFirstProducts(false);
        $scope.ricercaUrl = configService.getRicercaUrl(null);

        $scope.listoffset = 0;

        if ($scope.prod.title.length>2){
            $codCat = checkCategories.getCategories($scope.prod.title);
            //productSearch.search($scope.prod.title, $codCat);
            $scope.stopLoad = false;
            $scope.products = filteredProductsFactory.GetFirstProducts($scope.prod.title, $codCat);
        }
        else {
            if ($scope.prod.title.length==0){
                //productSearch.search(false);
                $scope.stopLoad = false;
                $scope.products = filteredProductsFactory.GetFirstProducts(false);
            }
        }
    }

});

var product = {
    "nid": "Id",
    "title": "Prodotto",
    "field_marchio": [],
    "body": "Descrizione",
    "field_produttore": "Produttore",
    "field_sito_azienda": [],
    "field_storia": "Storia",
    "Abitudine alimentare": [],
    "field_immagine_anteprima": "Url",
    "field_allergene" : [],
    "field_ingredienti": []
};

var nutritional_values = {

};

var getNutritionalValues = function(product,labelsTax) {

    var nutritionalValuesNotSet = false;
    var count = 0;
    var itemNutrionalValues = {};
    nutritional_values = {};

    if(product.field_valore_energetico_kcal_tx.length > 0 && product.field_valore_energetico_kcal_tx.length != '[]') {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['valore_energetico_kcal'], "value": product.field_valore_energetico_kcal_tx}
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_valore_energetico_kj_tx.length > 0 && product.field_valore_energetico_kj_tx != '[]') {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['valore_energetico_kj'], "value": product.field_valore_energetico_kj_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_proteine_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['proteine'], "value": product.field_proteine_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_grassi_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['grassi'], "value": product.field_grassi_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_grassi_di_cui_saturi_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['grassi_di_cui_saturi'], "value": product.field_grassi_di_cui_saturi_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_monoinsaturi_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['monoinsaturi'], "value": product.field_monoinsaturi_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_polinsaturi_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['polinsaturi'], "value": product.field_polinsaturi_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_carboidrati_tx.length > 0 && product.field_carboidrati_tx != '[]') {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['carboidrati'], "value": product.carboidrati};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_carboidrati_di_cui_sat_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['carboidrati_di_cui_saturi'], "value": product.field_carboidrati_di_cui_sat_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_polioli_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['polioli'], "value": product.field_polioli_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_amido_tx.length > 0){
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['amido'], "value": product.field_amido_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_fibre_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['fibre'], "value": product.field_fibre_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_sodio_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['sodio'], "value": product.field_sodio_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_vitamine_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['vitamine'], "value": product.field_vitamine_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(product.field_minerali_tx.length > 0) {
        nutritionalValuesNotSet = true;
        itemNutrionalValues = {"label" : labelsTax['minerali'], "value": product.field_minerali_tx};
        nutritional_values[count] = itemNutrionalValues;
        count=count+1;
    }

    if(nutritionalValuesNotSet == false) {
        itemNutrionalValues = {"label" : labelsTax['non_presenti'], "value": ""};
        nutritional_values[count] = itemNutrionalValues;
    }

    return nutritional_values;
};

var fixDataImagesAndHtmlSpecialEntities2 = function(data) {

    /* Funzione per:
     1) inserire il campo src nel campo field_immagine_anteprima di ogni prodotto.
     2) eliminare i caratteri html special entities dal titolo e dal nome del produttore.
     */
    var item = data[0];
    var product_allergies = [];

    /* Funzione per ottenere le allergie e le intolleranze */
    for(i=0; i<item.field_allergene.length; i+=2) {
        product_allergies[item.field_allergene[i]] = item.field_allergene[i+1];
    }

    window.localStorage.setItem("currentProductAllergies", JSON.stringify(item.field_allergene));

    /* Funzione per inserire il campo src nel campo field_immagine_anteprima di ogni prodotto */
    var img_src = item.field_immagine_copertina;
    var elem = document.createElement("div");
    elem.innerHTML = img_src;
    var img = elem.getElementsByTagName("img");
    if (img.length>0) {
        item.field_immagine_copertina = img[0].src;
    }
    else{
        item.field_immagine_copertina.push('nd');
    }
    // Eliminazione delle html special entities dal titolo del prodotto
    var title = document.createElement("textarea");
    title.innerHTML = item.title;
    item.title = title.value;

    // Eliminazione delle html special entities dal produttore del prodotto
    var prod = document.createElement("textarea");
    prod.innerHTML = item.field_produttore;
    item.field_produttore = prod.value;

    // Eliminazione delle html special entities dalla descrizione del prodotto
    var body = document.createElement("textarea");
    body.innerHTML = item.body;
    item.body = body.value;

    // Eliminazione delle html special entities dalla descrizione del prodotto
    var storia = document.createElement("textarea");
    storia.innerHTML = item.field_storia;
    item.field_storia = storia.value;

    return item;
};

/**
 * Factory per la restituzione del dettaglio di un prodotto
 */
app.factory('singleProductService', function ($http, $q, $cacheFactory, $window, configService, labelService, fakedataService) {

    var product_allergies = {
        "Pesce" : "No",
        "An. Solforosa e solfiti" : "No",
        "Crostacei" : "No",
        "Arachidi" : "No",
        "Uova" : "No",
        "Sesamo" : "No",
        "Senape" : "No",
        "Sedano" : "No",
        "Molluschi" : "No",
        "Frutta a guscio" : "No",
        "Soia" : "No",
        "Lupini" : "No",
        "Lattosio" : "No",
        "Proteine latte vaccino" : "No",
        "Glutine" : "No"
    };

    var config = configService.getHeaderConfig();

    return {
        getProduct: function (productId) {
            var deferred = $q.defer();
            var urlToCall ="";
            if (FAKEDATADETAIL){
                var data = fakedataService.getFakedataDetailProduct();

                product = JSON.parse(JSON.stringify(fixDataImagesAndHtmlSpecialEntities2(data)));
                deferred.resolve(product);
                nutritional_values = getNutritionalValues(product, labelService.getTaxLabels(getLanguage()));
            }
            else {

                urlToCall = configService.getDetailUrl() + productId;
                console.log ("Calling service .. " + urlToCall);
                $http
                    .get(urlToCall, config)
                    .success(function (data) {

                        if(productId === null) {
                            productId = $window.localStorage.getItem("id");
                        }

                        product = JSON.parse(JSON.stringify(fixDataImagesAndHtmlSpecialEntities2(data)));
                        deferred.resolve(product);

                        nutritional_values = getNutritionalValues(product, labelService.getTaxLabels(getLanguage()));

                    })
                    .error(function (data) {
                        console.log("calling service (4)" + urlToCall);
                        deferred.reject(data);
                    });
            }
            return deferred.promise;
        }
    };
});


/**
 * Controller per la gestione della pagina 1 del dettaglio
 */
app.controller('Page1Ctrl', function ($scope, $ionicPlatform, singleProductService, configService, labelService) {

    // Recupera id del prodotto cliccato
    $scope.labels = labelService.getLabels(getLanguage());
    $scope.labelsTax = labelService.getTaxLabels(getLanguage());
    $scope.perc_calorie = "1";
    $scope.porzione_descrizione ="ND";
    var porzione_valore = 0;
    var productId = window.localStorage.getItem("product_nid");
    //productService.load();
    $scope.items = ['Pesce', 'An. Solforosa e solfiti', 'Crostacei', 'Arachidi', 'Uova', 'Sesamo', 'Senape', 'Sedano', 'Molluschi', 'Frutta a guscio', 'Soia', 'Lupini', 'Lattosio', 'Proteine latte vaccino', 'Glutine'];
    $scope.product = null;
    $scope.allerg = [];
    $scope.abitudine_alimentare = [];
    singleProductService.getProduct(productId).then(function (data) {
        $scope.product = data;

        if (data.field_porzione.length>2){
            porzione_valore = data.field_porzione.substring(data.field_porzione.indexOf("[")+1,data.field_porzione.indexOf("]"));
            $scope.porzione_descrizione = data.field_porzione.substring(data.field_porzione.indexOf("]")+1,200);
            $scope.perc_calorie = Math.round((data.field_valore_energetico_kcal_tx * porzione_valore)/getClasseCal());
        }
        else
            $scope.perc_calorie = "0";

        var c=0;
        var ind = 0;
        for (c=0;c<data.field_allergene.length;c=c+2){
            $scope.allerg[ind] = [];
            $scope.allerg[ind][0]=data.field_allergene[c];
            $scope.allerg[ind][1]=data.field_allergene[c+1];
            if (getLanguage()=='en'){
                $scope.allerg[ind][0] = labelService.translateAllergene(data.field_allergene[c]);
            }
            ind++;
        }

        if (getLanguage()=='en'){
            for (d=0;d<data.field_abitudine_alimentare.length;d=d+1){
                if (data.field_abitudine_alimentare[d] == "Vegetariano")
                    $scope.abitudine_alimentare = $scope.labelsTax['vegetariana'];
                if (data.field_abitudine_alimentare[d] == "Vegano")
                    $scope.abitudine_alimentare += $scope.labelsTax['vegana'];
                if (d<data.field_abitudine_alimentare.length-1)
                    $scope.abitudine_alimentare += ", ";
            }
        }
        else {
            for (d=0;d<data.field_abitudine_alimentare.length;d=d+1){
                $scope.abitudine_alimentare += data.field_abitudine_alimentare[d];
                if (d<data.field_abitudine_alimentare.length-1)
                    $scope.abitudine_alimentare += ", ";
            }
        }

    });

    $scope.onSwipe = function (gesture, page) {
        switch (gesture) {
            case 'left': // from left to right
                window.location = "#/event/product2";
                break;
            case 'right': //from right to left
                //window.location = "product.html#/3";
                break;
            default:
                break;
        }
    };

});

/**
 * Controller per la gestione della pagina 2 del dettaglio
 */
app.controller('Page2Ctrl', function ($scope, $http, $ionicPlatform, configService, labelService, fakedataService) {
    var productId = window.localStorage.getItem("product_nid");
    var data = fakedataService.getFakedataRecipes();
    var urlToCall = "";
    var ricette = [];
    var config = configService.getHeaderConfig();

    $scope.labels = labelService.getLabels(getLanguage());
    $scope.ingredienti = product.field_ingredienti;
    $scope.nome = product.title;
    $scope.nutritional_values = nutritional_values;

    if (FAKEDATAURL) {
        data = fixDataImagesAndHtmlSpecialEntities(data, 'ricetta',labelService);
        ricette.push.apply(ricette, data);
    }
    else {
        urlToCall = configService.getRicetteUrl() + productId;
        console.log("Calling url (ric).." + urlToCall);
        $http
            .get(urlToCall, config)
            .success(function (data) {
                data = fixDataImagesAndHtmlSpecialEntities(data, 'ricetta',labelService);
                ricette.push.apply(ricette, data);
            })
            .error(function (data) {
                alert("Error calling service (1): " + urlToCall);
            })
    }

    $scope.ricette = ricette;

    $scope.onSwipe = function (gesture, page) {
        switch (gesture) {
            case 'left': // from left to right
                window.location = "#/event/product3";
                break;
            case 'right': //from right to left
                window.location = "#/event/product1";
                break;
            default:
                break;
        }
    };
});

/**
 * Controller per la gestione della pagina 3 del dettaglio
 */
app.controller('Page3Ctrl', function ($scope, $ionicGesture, configService, labelService) {

    $scope.labels = labelService.getLabels(getLanguage());
    $scope.nome = product.title;
    $scope.field_produttore = product.field_produttore;
    $scope.field_prodotto_a = product.field_prodotto_a;
    $scope.field_marchio = product.field_marchio;
    $scope.field_tipologia_produzione = product.field_tipologia_produzione;
    $scope.field_turismo_ed_eventi = product.field_turismo_ed_eventi;
    $scope.field_filiera_prodotto = product.field_filiera_prodotto;
    $scope.field_storia = product.field_storia;
    $scope.field_tecniche_di_produzione = product.field_tecniche_di_produzione;

    $scope.onSwipe = function (gesture, page) {
        switch (gesture) {
            case 'left': // from left to right
                //window.location = "#/event/product1";
                break;
            case 'right': //from right to left
                window.location = "#/event/product2";
                break;
            default:
                break;
        }
    };
});

app.controller('NavBarController', function ($scope, $state) {
    $scope.backButton = function () {
        $state.go('eventmenu.home');
    }

});
