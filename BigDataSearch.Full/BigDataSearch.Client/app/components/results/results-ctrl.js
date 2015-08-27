'use strict';

app.controller('ResultsCtrl', ['$routeParams', 'GooglePlusRestAngular', 'InstagramRestAngular', 'app.credentials', '$http', function ($routeParams, GooglePlusRestAngular, InstagramRestAngular, credentials, $http) {

    var vm = this;

    vm.resultsCtrl = {};

    vm.loadResults = loadResults;
    vm.toggleGooglePlusResults = toggleGooglePlusResults;
    vm.toggleGooglePlusPosts = toggleGooglePlusPosts;
    vm.toggleInstagramResults = toggleInstagramResults;
    vm.toggleInstagramPosts = toggleInstagramPosts;
    vm.googlePlusPostsToggle = false;
    vm.googlePlusResultsToggle = false;
    vm.instagramPostsToggle = false;
    vm.instagramResultsToggle = false;

    vm.loadResults();

    function loadResults() {
        googleRequest();

        instagramRequest();
    };

    function toggleGooglePlusResults() {
        vm.googlePlusResultsToggle = true;
        vm.googlePlusPostsToggle = false;
    };

    function toggleGooglePlusPosts() {
        vm.googlePlusResultsToggle = false;
        vm.googlePlusPostsToggle = true;
    };

    function toggleInstagramResults() {
        vm.instagramResultsToggle = true;
        vm.instagramPostsToggle = false;
    };

    function toggleInstagramPosts() {
        vm.instagramResultsToggle = false;
        vm.instagramPostsToggle = true;
    };

    function googleRequest() {
        var googleData = {
            query: $routeParams.search,
            maxResults: $routeParams.count,
            key: 'AIzaSyCk_hJqRoLyMVvX0MGHgh0plhJ6A_cj5T4'
        }

        GooglePlusRestAngular.all('activities').getList(googleData).then(function (success) {
            vm.googlePlusData = success;

            //googleData.pageToken = success.nextPage;

            //GooglePlusRestAngular.all('activities').getList(googleData).then(function (success) {
            //    vm.googlePlusData.push(success);
            //});

        }, function (error) {
            var teste = error;
        });
    };

    function instagramRequest() {
        var instagramQuery = $routeParams.search;
        var instagramData = {
            count: $routeParams.count,
            client_id: credentials.instagramClientId
        }

        InstagramRestAngular.all('/' + instagramQuery + '/media/recent').getList(instagramData).then(function (success) {
            vm.instagramData = success;

        }, function (error) {
            var er = error;
        });
    };

}]);