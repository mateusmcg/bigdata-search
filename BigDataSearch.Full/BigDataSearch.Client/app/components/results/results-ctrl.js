'use strict';

app.controller('ResultsCtrl', ['$routeParams', 'GooglePlusRestAngular', 'InstagramRestAngular', 'app.credentials', '$http', '$sce', function ($routeParams, GooglePlusRestAngular, InstagramRestAngular, credentials, $http, $sce) {

    var vm = this;

    vm.resultsCtrl = {};

    vm.loadResults = loadResults;
    vm.loadIFrame = loadIFrame;
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

    function loadIFrame(html) {        
        return $sce.trustAsHtml(html);
    }

    function googleRequest() {
        var googleData = {
            query: $routeParams.search.replace('#', ''),
            maxResults: $routeParams.count ? $routeParams.count : 20,
            key: 'AIzaSyCk_hJqRoLyMVvX0MGHgh0plhJ6A_cj5T4'
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
            vm.instagramData = success;

        }, function (error) {
            console.log('Erro na API do instagram: ' + error);
        });
    };

}]);