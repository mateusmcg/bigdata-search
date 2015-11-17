'use strict';

app.controller('ResultsCtrl', ['$routeParams', 'GooglePlusRestAngular', 'InstagramRestAngular', 'TwitterRestService', 'app.credentials', 'app.common.Utilities', '$scope', 'listaRanking', '$filter', function ($routeParams, GooglePlusRestAngular, InstagramRestAngular, TwitterRestService, credentials, Utilities, $scope, listaRanking, $filter) {

    var vm = this;

    var sentiment = new Sentimood();

    vm.resultsCtrl = {};

    vm.loadResults = loadResults;

    vm.loadResults();

    function loadResults() {
        twitterRequest();
        instagramRequest();
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
            var twitterRankingList = ($filter('orderBy')(($filter('filter')(listaRanking, { socialMidia: 'Twitter' })), '-count')).slice(0, 10);

            vm.twitterRankingDataSource = {
                chart: {
                    caption: "Twitter Ranking",
                    subCaption: "Top 10 words used in Twitter for #" + twitterQuery,
                    theme: "ocean",
                    exportEnabled: "1",
                    exportAtClient: "1",
                    exportHandler: "http://107.21.74.91/",
                    html5ExportHandler: "http://107.21.74.91/"
                },
                data: []
            };

            angular.forEach(twitterRankingList, function (item, index) {
                vm.twitterRankingDataSource.data.push({ label: item.palavra, value: item.count });
            });

            //Total de posts positivos
            vm.numPostsPositivosTwitter = $filter('filter')(success, function (item) {
                if (item.score > 0)
                    return item;
            });

            //Total de posts neutros
            vm.numPostsNeutrosTwitter = $filter('filter')(success, function (item) {
                if (item.score == 0)
                    return item;
            });

            //Total de posts negativos
            vm.numPostsNegativosTwitter = $filter('filter')(success, function (item) {
                if (item.score < 0)
                    return item;
            });

            vm.twitterResults = {
                chart: {
                    caption: "Twitter Results",
                    subCaption: "#" + twitterQuery,
                    showLabels: "1",
                    showLegend: "1",
                    enableMultiSlicing: "0",
                    slicingDistance: "25",
                    showPercentValues: "1",
                    plotToolText: "$datavalue posts $label",
                    exportEnabled: "1",
                    exportAtClient: "1",
                    exportHandler: "http://107.21.74.91/",
                    html5ExportHandler: "http://107.21.74.91/"
                },
                data: [
                    {
                        label: 'Positivos',
                        value: vm.numPostsPositivosTwitter.length.toString(),
                        color: '#00ff00'
                    },
                    {
                        label: 'Negativos',
                        value: vm.numPostsNegativosTwitter.length.toString(),
                        color: '#ff0000'
                    },
                    {
                        label: 'Neutros',
                        value: vm.numPostsNeutrosTwitter.length.toString(),
                        color: '#808080'
                    }
                ]
            }

            //Numera as palavras do ranking
            var rankCount = 1;
            angular.forEach(vm.twitterRanking, function (item, key) {
                item.id = rankCount;
                rankCount++;
            });

            vm.twitterData = success;

        }, function (error) {
            vm.twitterError = error.data.exceptionMessage;
            console.log('Erro na API do twitter:');
            console.log(error);
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
            var instagramRankingList = ($filter('orderBy')(($filter('filter')(listaRanking, { socialMidia: 'Instagram' })), '-count')).slice(0, 10);

            vm.instagramRankingDataSource = {
                chart: {
                    caption: "Instagram Ranking",
                    subCaption: "Top 10 words used in Instagram for #" + instagramQuery,
                    theme: "ocean",
                    exportEnabled: "1",
                    exportAtClient: "1",
                    exportHandler: "http://107.21.74.91/",
                    html5ExportHandler: "http://107.21.74.91/",
                },
                data: []
            };

            angular.forEach(instagramRankingList, function (item, index) {
                vm.instagramRankingDataSource.data.push({ label: item.palavra, value: item.count });
            });

            //Total de posts positivos
            vm.numPostsPositivosInstagram = $filter('filter')(success, function (item) {
                if (item.score > 0)
                    return item;
            });

            //Total de posts neutros
            vm.numPostsNeutrosInstagram = $filter('filter')(success, function (item) {
                if (item.score == 0)
                    return item;
            });

            //Total de posts negativos
            vm.numPostsNegativosInstagram = $filter('filter')(success, function (item) {
                if (item.score < 0)
                    return item;
            });

            vm.instagramResults = {
                chart: {
                    caption: "Instagram Results",
                    subCaption: "#" + instagramQuery,
                    showLabels: "1",
                    showLegend: "1",
                    enableMultiSlicing: "0",
                    slicingDistance: "25",
                    showPercentValues: "1",
                    plotToolText: "$datavalue posts $label",
                    exportEnabled: "1",
                    exportAtClient: "1",
                    exportHandler: "http://107.21.74.91/",
                    html5ExportHandler: "http://107.21.74.91/",
                },
                data: [
                    {
                        label: 'Positivos',
                        value: vm.numPostsPositivosInstagram.length.toString(),
                        color: '#00ff00'
                    },
                    {
                        label: 'Negativos',
                        value: vm.numPostsNegativosInstagram.length.toString(),
                        color: '#ff0000'
                    },
                    {
                        label: 'Neutros',
                        value: vm.numPostsNeutrosInstagram.length.toString(),
                        color: '#808080'
                    }
                ]
            }

            //Numera as palavras do ranking
            var rankCount = 1;
            angular.forEach(vm.instagramRanking, function (item, key) {
                item.id = rankCount;
                rankCount++;
            });

            vm.instagramData = success;
        }, function (error) {
            vm.instagramError = 'Não conseguimos processar a requisição. Por favor verifique a conexão com a internet ou tente mais tarde.';
            console.log('Erro na API do instagram:');
            console.log(error);
        });
    };

}]);