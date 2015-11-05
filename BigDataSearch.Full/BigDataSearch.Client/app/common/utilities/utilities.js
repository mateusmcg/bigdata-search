'use strict';

angular.module('app.common.utilities', []);

angular.module('app.common.utilities').provider('app.common.Utilities', ['stopwords-pt', 'stopwords-en', 'stopwords-es', 'lista-pt', 'lista-en', 'lista-es', function (stopwordsPt, stopwordsEn, stopwordsEs, listaPt, listaEn, listaEs) {

    //Responsável por remover as stopwords do post e armazenar cada palavra na 'listaSemStopWords'
    this.removeStopWords = function (post) {
        //Iterar sobre a lista de stopwords e removê-los.
        //Utilizar underscore (_)
        // _.find() _.remove()...
        //consultar http://underscorejs.org/

        //Após remover stopwords, adicionar cada palavra do post sem as stopwords na 'listaSemStopWords'
    }

    //Calcular o percentual de posts bons e ruins, a partir da 'listaBoa' e 'listaRuim'
    this.analyzeSentiment = function (post) {
        var neg, pos;
        var tokens = getTokens(post);
        pos = positivity(tokens);
        neg = negativity(tokens);
        return {
            score: pos.score - neg.score,
            comparative: pos.comparative - neg.comparative,
            positive: pos,
            negative: neg,
            words: tokens
        };
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
            analyzeSentiment: this.analyzeSentiment,
            calcRanking: this.calcRanking
        }
    }];

    function positivity(tokens) {
        var addPush, hits, i, item, j, len, noPunctuation, words;
        addPush = function (t, score) {
            hits += score;
            return words.push(t);
        };
        hits = 0;
        words = [];
        for (i = j = 0, len = tokens.length; j < len; i = ++j) {
            item = tokens[i];
            //Português
            if (listaPt.hasOwnProperty(item)) {
                if (listaPt[item] > 0) {
                    addPush(item, listaPt[item]);
                }
            }
            //Inglês
            else if (listaEn.hasOwnProperty(item)) {
                if (listaEn[item] > 0) {
                    addPush(item, listaEn[item]);
                }
            }
            //Espanhol
            else if (listaEs.hasOwnProperty(item)) {
                if (listaEs[item] > 0) {
                    addPush(item, listaEs[item]);
                }
            }
        }
        return {
            score: hits,
            comparative: hits / words.length,
            words: words
        };
    };

    function negativity(tokens) {
        var addPush, hits, i, item, j, len, noPunctuation, words;
        addPush = function (t, score) {
            hits -= score;
            return words.push(t);
        };
        hits = 0;
        words = [];
        for (i = j = 0, len = tokens.length; j < len; i = ++j) {
            item = tokens[i];
            //Português
            if (listaPt.hasOwnProperty(item)) {
                if (listaPt[item] < 0) {
                    addPush(item, listaPt[item]);
                }
            }
                //Inglês
            else if (listaEn.hasOwnProperty(item)) {
                if (listaEn[item] < 0) {
                    addPush(item, listaEn[item]);
                }
            }
                //Espanhol
            else if (listaEs.hasOwnProperty(item)) {
                if (listaEs[item] < 0) {
                    addPush(item, listaEs[item]);
                }
            }
        }
        return {
            score: hits,
            comparative: hits / words.length,
            words: words
        };
    };

    function getTokens(str) {
        var cleanPost;
        cleanPost = convert_accented_characters(str); //Substitui acentos.
        cleanPost = cleanPost.replace(/[^a-zA-Z ]+/g, " "); //Remove caracteres especiais.
        cleanPost = cleanPost.toLowerCase(); //Deixa minúsculo.
        cleanPost = cleanPost.replace(/\s\s+/g, ' ').trim(); //Remove espaços em branco.

        var tokens = cleanPost.split(" ");

        return tokens;
    }

    function convert_accented_characters(str) {
        var conversions = new Object();
        conversions['ae'] = 'ä|æ|ǽ';
        conversions['oe'] = 'ö|œ';
        conversions['ue'] = 'ü';
        conversions['Ae'] = 'Ä';
        conversions['Ue'] = 'Ü';
        conversions['Oe'] = 'Ö';
        conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
        conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
        conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
        conversions['c'] = 'ç|ć|ĉ|ċ|č';
        conversions['D'] = 'Ð|Ď|Đ';
        conversions['d'] = 'ð|ď|đ';
        conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
        conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
        conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
        conversions['g'] = 'ĝ|ğ|ġ|ģ';
        conversions['H'] = 'Ĥ|Ħ';
        conversions['h'] = 'ĥ|ħ';
        conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
        conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
        conversions['J'] = 'Ĵ';
        conversions['j'] = 'ĵ';
        conversions['K'] = 'Ķ';
        conversions['k'] = 'ķ';
        conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
        conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
        conversions['N'] = 'Ñ|Ń|Ņ|Ň';
        conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
        conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
        conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
        conversions['R'] = 'Ŕ|Ŗ|Ř';
        conversions['r'] = 'ŕ|ŗ|ř';
        conversions['S'] = 'Ś|Ŝ|Ş|Š';
        conversions['s'] = 'ś|ŝ|ş|š|ſ';
        conversions['T'] = 'Ţ|Ť|Ŧ';
        conversions['t'] = 'ţ|ť|ŧ';
        conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
        conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
        conversions['Y'] = 'Ý|Ÿ|Ŷ';
        conversions['y'] = 'ý|ÿ|ŷ';
        conversions['W'] = 'Ŵ';
        conversions['w'] = 'ŵ';
        conversions['Z'] = 'Ź|Ż|Ž';
        conversions['z'] = 'ź|ż|ž';
        conversions['AE'] = 'Æ|Ǽ';
        conversions['ss'] = 'ß';
        conversions['IJ'] = 'Ĳ';
        conversions['ij'] = 'ĳ';
        conversions['OE'] = 'Œ';
        conversions['f'] = 'ƒ';

        for (var i in conversions) {
            var re = new RegExp(conversions[i], "g");
            str = str.replace(re, i);
        }

        return str;
    }

}]);