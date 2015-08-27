'use strict';

angular.module('app.common.factory', []);

angular.module('app.common.factory').factory('TwitterRestAngular', ['Restangular', function (RestAngular) {
    return RestAngular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setJsonp(true);
        RestangularConfigurer.setDefaultRequestParams('jsonp', { callback: 'JSON_CALLBACK' });
        RestangularConfigurer.setBaseUrl('https://api.twitter.com/1.1/search/');
    })
}]);

angular.module('app.common.factory').factory('TwitterAuthRestAngular', ['Restangular', function (RestAngular) {
    return RestAngular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setJsonp(true);
        RestangularConfigurer.setDefaultRequestParams('jsonp', { callback: 'JSON_CALLBACK' });
        RestangularConfigurer.setBaseUrl('https://api.twitter.com/oauth2/');
    })
}]);

angular.module('app.common.factory').factory('InstagramRestAngular', ['Restangular', function (RestAngular) {
    return RestAngular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setJsonp(true);
        RestangularConfigurer.setDefaultRequestParams('jsonp', { callback: 'JSON_CALLBACK' });
        RestangularConfigurer.setBaseUrl('https://api.instagram.com/v1/tags/');
    })
}]);

angular.module('app.common.factory').factory('GooglePlusRestAngular', ['Restangular', function (RestAngular) {
    return RestAngular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('https://www.googleapis.com/plus/v1/');
    })
}]);