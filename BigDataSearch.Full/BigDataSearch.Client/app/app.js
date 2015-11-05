'use strict';

var app = angular.module('BigDataSearchApp', [
        //## Angular modules
        'ngRoute',
        'ui.bootstrap',

        //## Commons
        'app.common']);

app.constant('app.credentials', {
    instagramClientId: 'f5e26fff0ccf478ab2811729b09fba1c',
    googlePlusKey: 'AIzaSyCk_hJqRoLyMVvX0MGHgh0plhJ6A_cj5T4'
});

app.config(['$routeProvider', 'RestangularProvider', 'app.credentials', function ($routeProvider, RestangularProvider, credentials) {
    $routeProvider.when('/results', {
        templateUrl: 'app/components/results/results.html',
        controllerUrl: 'app/components/results/results-ctrl.js'
    });

    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;

        if (url.indexOf('instagram') > -1) {

            if (operation === "getList") {
                extractedData = data.data;
                extractedData.meta = data.meta;
                extractedData.pagination = data.pagination;
            }

            return extractedData;
        }

        if (url.indexOf('google') > -1) {

            if (operation === "getList") {
                extractedData = data.items;
                extractedData.nextPage = data.nextPageToken;
            }

            return extractedData;
        }
    });
}]);