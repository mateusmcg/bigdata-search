'use strict';

angular.module('app.common.utilities', []);

angular.module('app.common.utilities').provider('app.common.Utilities', ['stopwords-pt', 'stopwords-en', 'stopwords-es', 'listaBoa', 'listaRuim', 'listaSemStopWords', function (stopwordsPt, stopwordsEn, stopwordsEs, listaBoa, listaRuim, listaSemStopWords) {

    //Responsável por remover as stopwords do post e armazenar cada palavra na 'listaSemStopWords'
    this.removeStopWords = function (post) {
        //Iterar sobre a lista de stopwords e removê-los.
        //Utilizar underscore (_)
        // _.find() _.remove()...
        //consultar http://underscorejs.org/

        //Após remover stopwords, adicionar cada palavra do post sem as stopwords na 'listaSemStopWords'
    }

    //Calcular o percentual de posts bons e ruins, a partir da 'listaBoa' e 'listaRuim'
    this.calcBomRuim = function () {

    }

    //Retornar o número de palavras especificadas por parâmetro que mais apareceram nos posts
    //Ex: 1. Thiago - 241 vezes
    //    2. Japonês - 210 vezes
    //    Ostentação - 180 vezes
    //...
    this.calcRanking = function (qtdPostsNoRanking) {

    }

    this.$get = [function () {
        return {
            removeStopWords: this.removeStopWords,
            calcBomRuim: this.calcBomRuim,
            calcRanking: this.calcRanking
        }
    }];

}]);