'use strict';

var app = angular.module('BigDataSearchApp', [
        //## Angular modules
        'ngRoute',

        //## Commons
        'app.common']);

app.constant('app.common.constants', {
    instagramClientId: 'f5e26fff0ccf478ab2811729b09fba1c'
});

app.constant('app.credentials', {
    twitterConsumerKey: 'QwFKFa2q2EsjeX5xVtfD7JySY',
    twitterConsumerSecret: 'o6lDjEfhabN7BfY1JxxlTV1JCkNmuXmcmwgQclLJzyr5gv9tRK',
    instagramClientId: 'f5e26fff0ccf478ab2811729b09fba1c'
});

app.config(['$routeProvider', 'RestangularProvider', 'app.credentials', '$httpProvider', function ($routeProvider, RestangularProvider, credentials, $httpProvider) {
    $routeProvider.when('/results', {
        templateUrl: 'app/components/results/results.html',
        controllerUrl: 'app/components/results/results-ctrl.js'
    });

    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

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

    //RestangularProvider.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {

    //    headers['Content-type'] = 'application/x-www-form-urlencoded';
    //    headers['Authorization'] = 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAAOj6gwAAAAAA8my2Nvosw1WDaJsBmnwBGBaLmvk%3DKSdavGqSxneHCKpK8ruVJMQa7Mm8Sx0zb9vy21enyd8aD0vShW';

    //    //switch (url) {
    //    //    case 'https://api.twitter.com/oauth2/token': {
    //    //        headers['Content-type'] = 'application/x-www-form-urlencoded';
    //    //        headers['Authorization'] = 'Bearer ' + 'AAAAAAAAAAAAAAAAAAAAAOj6gwAAAAAA8my2Nvosw1WDaJsBmnwBGBaLmvk%3DKSdavGqSxneHCKpK8ruVJMQa7Mm8Sx0zb9vy21enyd8aD0vShW';
    //    //        break;
    //    //    }
    //    //    default:

    //    //}

    //    return {
    //        element: element,
    //        headers: headers,
    //        params: params,
    //        httpConfig: httpConfig
    //    };
    //});
}]);

app.run(['localStorageService', 'GooglePlusRestAngular', 'TwitterAuthRestAngular', function (localStorageService, GooglePlusRestAngular, TwitterAuthRestAngular) {

    //verifyToken();

    function verifyToken() {
        var token = localStorageService.get('app-token');

        if (!token) {
            var data = "grant_type=client_credentials";
            TwitterAuthRestAngular.all('token').post(data).then(function (success) {
                var teste = success;
            }, function (error) {
                var teste = error;
            });
        };
    };

}]);