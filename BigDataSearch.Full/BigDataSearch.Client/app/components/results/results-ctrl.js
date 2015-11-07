'use strict';

app.controller('ResultsCtrl', ['$routeParams', 'GooglePlusRestAngular', 'InstagramRestAngular', 'app.credentials', 'app.common.Utilities', '$scope', function ($routeParams, GooglePlusRestAngular, InstagramRestAngular, credentials, Utilities, $scope) {

    var vm = this;

    var sentiment = new Sentimood();

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
            maxResults: $routeParams.count > 20 ? 20 : $routeParams.count,
            key: credentials.googlePlusKey
        }

        var resultCount = $routeParams.count;

        GooglePlusRestAngular.all('activities').getList(googleData).then(function (success) {
            vm.googlePlusData = success;

            var postNumber = 1;

            angular.forEach(success, function (item, index) {
                var fullPost = item.title + ' ' + item.object.content;
                var postSentiment = Utilities.analyzeSentiment(fullPost);
                //var postSentiment = sentiment.analyze(fullPost);
                item.score = postSentiment.score;
                item.words = item.score > 0 ? postSentiment.positive.words.join(', ') : postSentiment.negative.words.join(', ');
                item.postNumber = postNumber++;
            });

            var numberOfPages = resultCount % googleData.maxResults == 0 ? resultCount / googleData.maxResults : parseInt(resultCount / googleData.maxResults) + 1;

            var promise;
            var currentPage = 2;

            for (var i = 0; i < numberOfPages; i++) {
                if (!promise)
                    promise = GooglePlusRestAngular.all('activities').getList(googleData);
                else {
                    promise = promise.then(function (page) {
                        angular.forEach(page, function (item, index) {
                            vm.googlePlusData.push(item);
                            var fullPost = item.title + ' ' + item.object.content;
                            var postSentiment = Utilities.analyzeSentiment(fullPost);
                            //var postSentiment = sentiment.analyze(fullPost);
                            item.score = postSentiment.score;
                            item.words = item.score > 0 ? postSentiment.positive.words.join(', ') : postSentiment.negative.words.join(', ');
                            item.postNumber = postNumber++;
                        });

                        currentPage++;
                        googleData.pageToken = page.nextPage;
                        googleData.maxResults = currentPage == numberOfPages ? resultCount % googleData.maxResults : 20;

                        return GooglePlusRestAngular.all('activities').getList(googleData);
                    });
                }
            }
        }, function (error) {
            console.log('Erro na API do google: ', error);
        });
    };

    function instagramRequest() {
        var instagramQuery = $routeParams.search.replace('#', '');
        var instagramData = {
            count: $routeParams.count ? $routeParams.count : 20,
            client_id: credentials.instagramClientId
        }

        InstagramRestAngular.all('/' + instagramQuery + '/media/recent').getList(instagramData).then(function (success) {
            var postNumber = 1;
            angular.forEach(success, function (data, index) {
                var fullPost = data.caption ? data.caption.text + ' ' : '';
                fullPost = fullPost ? fullPost.replace(/#/g, '') : fullPost.concat(data.tags.join(' '));
                var postSentiment = Utilities.analyzeSentiment(fullPost);
                //var postSentiment = sentiment.analyze(fullPost);
                data.score = postSentiment.score;
                data.words = data.score > 0 ? postSentiment.positive.words.join(', ') : postSentiment.negative.words.join(', ');
                data.postNumber = postNumber;
                postNumber++;
            });
            vm.instagramData = success;
        }, function (error) {
            console.log('Erro na API do instagram: ' + error);
        });
    };

}]);