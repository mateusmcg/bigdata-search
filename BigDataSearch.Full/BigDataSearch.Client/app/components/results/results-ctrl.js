'use strict';

app.controller('ResultsCtrl', ['$routeParams', 'GooglePlusRestAngular', 'InstagramRestAngular', 'TwitterRestService', 'app.credentials', 'app.common.Utilities', '$scope', 'listaRanking', '$filter', function ($routeParams, GooglePlusRestAngular, InstagramRestAngular, TwitterRestService, credentials, Utilities, $scope, listaRanking, $filter) {

    var vm = this;

    var sentiment = new Sentimood();

    vm.resultsCtrl = {};

    vm.loadResults = loadResults;
    vm.toggleTwitterResults = toggleTwitterResults;
    vm.toggleTwitterPosts = toggleTwitterPosts;
    vm.toggleTwitterRanking = toggleTwitterRanking;
    vm.toggleInstagramResults = toggleInstagramResults;
    vm.toggleInstagramPosts = toggleInstagramPosts;
    vm.toggleInstagramRanking = toggleInstagramRanking;
    vm.twitterPostsToggle = false;
    vm.twitterResultsToggle = false;
    vm.twitterRankingToggle = false;
    vm.instagramPostsToggle = false;
    vm.instagramResultsToggle = false;
    vm.instagramRankingToggle = false;

    vm.loadResults();

    function loadResults() {
        twitterRequest();        
        instagramRequest();
    };

    function toggleTwitterResults() {
        vm.twitterPostsToggle = false;
        vm.twitterRankingToggle = false;
        vm.twitterResultsToggle = true;
    };

    function toggleTwitterPosts() {
        vm.twitterResultsToggle = false;
        vm.twitterRankingToggle = false;
        vm.twitterPostsToggle = true;
    };

    function toggleTwitterRanking() {
        vm.twitterResultsToggle = false;
        vm.twitterPostsToggle = false;
        vm.twitterRankingToggle = true;
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

    function twitterRequest() {
        var twitterQuery = $routeParams.search.replace('#', '');
        var twitterData = {
            count: $routeParams.count ? $routeParams.count : 20,
            query: twitterQuery
        }

        TwitterRestService.all('api/twitter/tweets/' + twitterData.query + '/' + twitterData.count).getList().then(function (success) {
            var postNumber = 1;
            angular.forEach(success, function (data, index) {
                var fullPost = data.text;
                //fullPost = fullPost ? fullPost.replace(/#/g, ' ') : fullPost.concat(data.tags.join(' '));
                var postSentiment = Utilities.analyzeSentiment(fullPost, 'Twitter');
                data.score = postSentiment.score;
                data.words = data.score > 0 ? postSentiment.positive.words.join(', ') : postSentiment.negative.words.join(', ');
                data.postNumber = postNumber;
                postNumber++;
            });

            //Total de palavras do Twitter
            vm.totalTwitterWords = ($filter('filter')(listaRanking, { socialMidia: 'Twitter' })).length;

            //Lista com as 10 palavras que mais se repetiram
            vm.twitterRanking = ($filter('orderBy')(($filter('filter')(listaRanking, { socialMidia: 'Twitter' })), '-count')).slice(0, 10);

            //Total de posts positivos
            vm.numPostsPositivosTwitter = $filter('filter')(success, function (item) {
                return item.score > 0;
            }).length;
            vm.postsPositivosPercentTwitter = ((vm.numPostsPositivosTwitter / success.length) * 100).toFixed(2);

            //Total de posts neutros
            vm.numPostsNeutrosTwitter = $filter('filter')(success, function (item) {
                return item.score == 0;
            }).length;
            vm.postsNeutrosPercentTwitter = ((vm.numPostsNeutrosTwitter / success.length) * 100).toFixed(2);

            //Total de posts negativos
            vm.numPostsNegativosTwitter = $filter('filter')(success, function (item) {
                return item.score < 0;
            }).length;
            vm.postsNegativosPercentTwitter = ((vm.numPostsNegativosTwitter / success.length) * 100).toFixed(2);

            //Numera as palavras do ranking
            var rankCount = 1;
            angular.forEach(vm.twitterRanking, function (item, key) {
                item.id = rankCount;
                rankCount++;
            }, function (error) {
                console.log('Erro na API do twitter:');
                console.log(error);
            });

            vm.twitterData = success;
        });
    }

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
                fullPost = fullPost ? fullPost.replace(/#/g, ' ') : fullPost.concat(data.tags.join(' '));
                var postSentiment = Utilities.analyzeSentiment(fullPost, 'Instagram');
                data.score = postSentiment.score;
                data.words = data.score > 0 ? postSentiment.positive.words.join(', ') : postSentiment.negative.words.join(', ');
                data.postNumber = postNumber;
                postNumber++;
            });

            //Total de palavras do Instagram
            vm.totalInstagramWords = ($filter('filter')(listaRanking, { socialMidia: 'Instagram' })).length;

            //Lista com as 10 palavras que mais se repetiram
            vm.instagramRanking = ($filter('orderBy')(($filter('filter')(listaRanking, { socialMidia: 'Instagram' })), '-count')).slice(0, 10);

            //Total de posts positivos
            vm.numPostsPositivosInstagram = $filter('filter')(success, function (item) {
                return item.score > 0;
            }).length;
            vm.postsPositivosPercentInstagram = ((vm.numPostsPositivosInstagram / success.length) * 100).toFixed(2);

            //Total de posts neutros
            vm.numPostsNeutrosInstagram = $filter('filter')(success, function (item) {
                return item.score == 0;
            }).length;
            vm.postsNeutrosPercentInstagram = ((vm.numPostsNeutrosInstagram / success.length) * 100).toFixed(2);

            //Total de posts negativos
            vm.numPostsNegativosInstagram = $filter('filter')(success, function (item) {
                return item.score < 0;
            }).length;
            vm.postsNegativosPercentInstagram = ((vm.numPostsNegativosInstagram / success.length) * 100).toFixed(2);

            //Numera as palavras do ranking
            var rankCount = 1;
            angular.forEach(vm.instagramRanking, function (item, key) {
                item.id = rankCount;
                rankCount++;
            });

            vm.instagramData = success;
        }, function (error) {
            console.log('Erro na API do instagram:');
            console.log(error);
        });
    };

}]);