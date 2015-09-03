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

app.config(['$routeProvider', 'RestangularProvider', 'app.credentials', '$httpProvider', '$sceDelegateProvider', function ($routeProvider, RestangularProvider, credentials, $httpProvider, $sceDelegateProvider) {
    $routeProvider.when('/results', {
        templateUrl: 'app/components/results/results.html',
        controllerUrl: 'app/components/results/results-ctrl.js'
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://plus.google.com/**'
    ]);

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

    //    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //    //headers['Accept'] = '*/*';
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

app.run(['localStorageService', 'GooglePlusRestAngular', 'TwitterRestAngular', '$twitterApi', '$http', function (localStorageService, GooglePlusRestAngular, TwitterRestAngular, $twitterApi, $http) {

    //verifyToken();

    //$twitterApi.configure('QwFKFa2q2EsjeX5xVtfD7JySY', 'o6lDjEfhabN7BfY1JxxlTV1JCkNmuXmcmwgQclLJzyr5gv9tRK', 'AAAAAAAAAAAAAAAAAAAAAOj6gwAAAAAA8my2Nvosw1WDaJsBmnwBGBaLmvk%3DKSdavGqSxneHCKpK8ruVJMQa7Mm8Sx0zb9vy21enyd8aD0vShW');

    //$twitterApi.getHomeTimeline().then(function (data) {
    //    var data;
    //});

    function verifyToken() {
        var token = localStorageService.get('app-token');

        if (!token) {
            //var data = "grant_type=client_credentials";
            var data = {
                callback: 'JSON_CALLBACK'
            }

            //$.ajax({                
            //    url: 'https://api.twitter.com/1.1/search/tweets.json?q=10dilma',
            //    headers: {
            //        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAOj6gwAAAAAA8my2Nvosw1WDaJsBmnwBGBaLmvk%3DKSdavGqSxneHCKpK8ruVJMQa7Mm8Sx0zb9vy21enyd8aD0vShW',
            //        'Accept-Encoding': 'gzip',
            //        'Content-Type': 'application/x-www-form-urlencoded'
            //    },
            //    dataType: 'jsonp',
            //    success: function (results) {
            //        console.log(results);
            //    },
            //    error: function (error) {
            //        console.log(error);
            //    }
            //});

            //$http.jsonp('https://api.twitter.com/1.1/search/tweets.json?callback=JSON_CALLBACK&q=dilma', {
            //    headers: {
            //        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAOj6gwAAAAAA8my2Nvosw1WDaJsBmnwBGBaLmvk%3DKSdavGqSxneHCKpK8ruVJMQa7Mm8Sx0zb9vy21enyd8aD0vShW',
            //        'Accept-Encoding': 'gzip',
            //        'Content-Type': 'application/x-www-form-urlencoded'
            //    }
            //}).success(function (data) {
            //    var teste = data;
            //});

            TwitterRestAngular.all('tweets.json?q=dilma').getList(data).then(function (success) {
                var teste = success;
            }, function (error) {
                var teste = error;
            });
        };
    };

}]);