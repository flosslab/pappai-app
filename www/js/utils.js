var utils = angular.module("utilsApp",[]);

var buildFilterUrl = function () {

    urlParameters = "";
    if (window.localStorage.getItem("toggles")){
        abitudini = JSON.parse( window.localStorage.getItem("abitudine") );
        tipo = JSON.parse( window.localStorage.getItem("tipo") );
        allergie = JSON.parse( window.localStorage.getItem("allergie") );
        toggles = JSON.parse( window.localStorage.getItem("toggles") );

        // posizioni 0 e 1 : abit[]
        if (abitudini[0] === true && abitudini[1] ===true) {
                urlParameters += "&abit[]="+toggles[1];
        }
        if (abitudini[0] === true && abitudini[1] ===false) {
            urlParameters += "&abit[]="+toggles[0];
        }
        /**Non dovrebbe verificarsi*/
        if (abitudini[0] === false && abitudini[1] === true) {
            urlParameters += "&abit[]="+toggles[1];
        }

        // posizioni 2 - x : field_allergene_tid[]
        for (i=0; i<allergie.length; i++) {
            if (allergie[i] === true) {
                pos = i+abitudini.length;
                urlParameters += "&field_allergene_tid[]="+toggles[pos];
            }
        }

        // posizioni x - end : cat[]
        /*for (i=0; i<tipo.length; i++) {
            if (tipo[i] === true) {
                pos = i+abitudini.length+allergie.length;
                urlParameters += "&cat[]="+toggles[pos];
            }
        }*/
    }

    return urlParameters;
};

var ricercaFilterUrl = function ($categories) {

    var currentUrl ="";
    for (i=0; i<$categories.length; i++) {
        currentUrl += "&cat[]="+$categories[i];
    }
    return currentUrl;
}


/* Servizio per gestione animazione transizioni */
utils.service('Navigation', function($state) {
    //directly binding events to this context
    this.goNative = function(view, data, direction) {
        $state.go(view, data);
        window.plugins.nativepagetransitions.slide({
                "direction": direction
            },
            function(msg) {
                console.log("success: " + msg)
            }, // called when the animation has finished
            function(msg) {
                alert("error: " + msg)
            } // called in case you pass in weird values
        );
    };
});

utils.factory ("ricercaFilterUrl", ricercaFilterUrl);
utils.factory ("buildFilterUrl", buildFilterUrl);

/* Directive per gestione animazione transizioni */
utils.directive('goNative', ['$ionicGesture', '$ionicPlatform', function($ionicGesture, $ionicPlatform) {
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {

            $ionicGesture.on('tap', function(e) {

                var direction = attrs.direction;
                var transitiontype = attrs.transitiontype;

                $ionicPlatform.ready(function() {

                    switch (transitiontype) {
                        case "slide":
                            window.plugins.nativepagetransitions.slide({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;
                        case "flip":
                            window.plugins.nativepagetransitions.flip({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        case "fade":
                            window.plugins.nativepagetransitions.fade({

                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        case "drawer":
                            window.plugins.nativepagetransitions.drawer({
                                    "origin"         : direction,
                                    "action"         : "open"
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        case "curl":
                            window.plugins.nativepagetransitions.curl({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                            break;

                        default:
                            window.plugins.nativepagetransitions.slide({
                                    "direction": direction
                                },
                                function(msg) {
                                    console.log("success: " + msg)
                                },
                                function(msg) {
                                    alert("error: " + msg)
                                }
                            );
                    }
                });
            }, element);
        }
    };
}]);