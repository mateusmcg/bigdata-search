'use strict';

app.controller('ResultsCtrl', ['$routeParams', 'GooglePlusRestAngular', 'InstagramRestAngular', 'app.credentials', 'app.common.Utilities', function ($routeParams, GooglePlusRestAngular, InstagramRestAngular, credentials, Utilities) {

    var vm = this;

    vm.resultsCtrl = {};

    vm.loadResults = loadResults;
    vm.toggleGooglePlusResults = toggleGooglePlusResults;
    vm.toggleGooglePlusPosts = toggleGooglePlusPosts;
    vm.toggleGooglePlusRanking = toggleGooglePlusRanking;
    vm.toggleInstagramResults = toggleInstagramResults;
    vm.toggleInstagramPosts = toggleInstagramPosts;
    vm.toggleInstagramRanking = toggleInstagramRanking;
    vm.googlePlusPostsToggle = false;
    vm.googlePlusResultsToggle = false;
    vm.googlePlusRankingToggle = false;
    vm.instagramPostsToggle = false;
    vm.instagramResultsToggle = false;
    vm.instagramRankingToggle = false;

    vm.loadResults();

    function loadResults() {
        googleRequest();
        instagramRequest();
    };

    function toggleGooglePlusResults() {        
        vm.googlePlusPostsToggle = false;
        vm.googlePlusRankingToggle = false;
        vm.googlePlusResultsToggle = true;
    };

    function toggleGooglePlusPosts() {
        vm.googlePlusResultsToggle = false;
        vm.googlePlusRankingToggle = false;
        vm.googlePlusPostsToggle = true;
    };

    function toggleGooglePlusRanking() {
        vm.googlePlusResultsToggle = false;        
        vm.googlePlusPostsToggle = false;
        vm.googlePlusRankingToggle = true;
    };

    function toggleInstagramResults() {
        vm.instagramRankingToggle = false;
        vm.instagramPostsToggle = false;
        vm.instagramResultsToggle = true;
    };

    function toggleInstagramPosts() {
        vm.instagramResultsToggle = false;
        vm.instagramRankingToggle = false;
        vm.instagramPostsToggle = true;
    };

    function toggleInstagramRanking() {
        vm.instagramPostsToggle = false;
        vm.instagramResultsToggle = false;
        vm.instagramRankingToggle = true;
    };

    function googleRequest() {
        var googleData = {
            query: $routeParams.search.replace('#', ''),
            maxResults: $routeParams.count ? $routeParams.count : 20,
            key: credentials.googlePlusKey
        }

        GooglePlusRestAngular.all('activities').getList(googleData).then(function (success) {
            vm.googlePlusData = success;

            //googleData.pageToken = success.nextPage;

            //GooglePlusRestAngular.all('activities').getList(googleData).then(function (success) {
            //    vm.googlePlusData.push(success);
            //});

        }, function (error) {
            console.log('Erro na API do google: ' + error);
        });
    };

    function instagramRequest() {
        var instagramQuery = $routeParams.search.replace('#', '');
        var instagramData = {
            count: $routeParams.count ? $routeParams.count : 20,
            client_id: credentials.instagramClientId
        }

        InstagramRestAngular.all('/' + instagramQuery + '/media/recent').getList(instagramData).then(function (success) {
            angular.forEach(success, function (data, index) {
                Utilities.removeStopWords("teste");
            });
            vm.instagramData = success;
        }, function (error) {
            console.log('Erro na API do instagram: ' + error);
        });
    };

}]);