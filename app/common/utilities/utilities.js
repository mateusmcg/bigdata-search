'use strict';

angular.module('app.common.utilities', []);

angular.module('app.common.utilities').provider('app.common.Utilities', ['stopwords-pt', 'stopwords-en', 'stopwords-es', 'lista-pt', 'lista-en', 'lista-es', 'listaRanking', 'listaQuantitativos', function (stopwordsPt, stopwordsEn, stopwordsEs, listaPt, listaEn, listaEs, listaRanking, listaQuantitativos) {

    //Responsável por remover as stopwords do post e armazenar cada palavra na 'listaSemStopWords'
    this.removeStopWords = function (tokens) {
        var pt = _.difference(tokens, stopwordsPt);
        var en = _.difference(pt, stopwordsEn);
        return _.difference(en, stopwordsEs);
    }

    //Calcular o percentual de posts bons e ruins, a partir da 'listaBoa' e 'listaRuim'
    this.analyzeSentiment = function (post, socialMidia) {
        var neg, pos, heuristic;
        var tokens = getTokens(post);
        tokens = this.removeStopWords(tokens);

        var insertection = _.intersection(tokens, listaQuantitativos);
        if (insertection.length > 0) {
            heuristic = heuristicEvaluation(tokens, insertection, socialMidia);
        }

        pos = positivity(tokens, socialMidia);
        neg = negativity(tokens, socialMidia);

        if (heuristic) {
            if (heuristic.score < 0) {
                neg.score = neg.score + (heuristic.score * -1);
                neg.words = neg.words.concat(heuristic.words);
                neg.heuristicComparative = heuristic.comparative;
            } else if (heuristic.score > 0) {
                pos.score = pos.score + heuristic.score;
                pos.words = pos.words.concat(heuristic.words);
                pos.heuristicComparative = heuristic.comparative;
            }
        }        

        return {
            score: pos.score - neg.score,
            comparative: pos.comparative - neg.comparative,
            positive: pos,
            negative: neg,
            words: tokens,
            heuristic: heuristic
        };
    }

    this.$get = [function () {
        return {
            analyzeSentiment: this.analyzeSentiment,
            removeStopWords: this.removeStopWords
        }
    }];

    var calcRanking = function (word, socialMidia) {
        var exists = _.where(listaRanking, { palavra: word, socialMidia: socialMidia });
        exists.length == 0 ? listaRanking.push({ palavra: word, count: 1, socialMidia: socialMidia }) : _.find(listaRanking, function (item) { return item.palavra == word && item.socialMidia == socialMidia }).count++;
    }

    function positivity(tokens, socialMidia) {
        var addPush, hits, i, item, j, len, noPunctuation, words;
        addPush = function (t, score) {
            hits += score;
            return words.push(t);
        };
        hits = 0;
        words = [];
        for (i = j = 0, len = tokens.length; j < len; i = ++j) {
            calcRanking(tokens[i], socialMidia);
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
    }

    function negativity(tokens, socialMidia) {
        var addPush, hits, i, item, j, len, noPunctuation, words;
        addPush = function (t, score) {
            hits -= score;
            return words.push(t);
        };
        hits = 0;
        words = [];
        for (i = j = 0, len = tokens.length; j < len; i = ++j) {
            calcRanking(tokens[i], socialMidia);
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
    }

    function getPercentByDistance(distance) {
        switch (distance) {
            case 1:
            case -1:
                return 2;
            case 2:
            case -2:
                return 1.5;
            case 3:
            case -3:
                return 1.25;
            default:
                return 1;
        }
    }

    function heuristicEvaluation(tokens, insertection, socialMidia) {
        var index = [], words = [], wordsToRemove = [], score = 0, item;

        //Recupera os index 
        for (var i = 0; i < insertection.length; i++) {
            index.push(tokens.indexOf(insertection[i]));
        }

        //Avaliar os raios -3 a 3, para cada palavra Quantitativa existente no post.
        for (var i = 0; i < index.length; i++) {
            for (var j = i - 3 ; j <= i + 3; j++) {
                var percent = getPercentByDistance(j);
                item = tokens[index[i] + j];
                if (item) {
                    if (j != 0) {
                        //Português
                        if (listaPt.hasOwnProperty(item)) {
                            score += listaPt[item] * percent;
                            j > 0 ? words.push(tokens[index[i]] + ' ' + item) : words.push(item + ' ' + tokens[index[i]]);
                        }
                            //Inglês
                        else if (listaEn.hasOwnProperty(item)) {
                            score += listaEn[item] * percent;
                            j > 0 ? words.push(tokens[index[i]] + ' ' + item) : words.push(item + ' ' + tokens[index[i]]);
                        }
                            //Espanhol
                        else if (listaEs.hasOwnProperty(item)) {
                            score += listaEs[item] * percent;
                            j > 0 ? words.push(tokens[index[i]] + ' ' + item) : words.push(item + ' ' + tokens[index[i]]);
                        }
                    }

                    wordsToRemove.push(item);
                }
            }
        }

        for (var i = 0; i < wordsToRemove.length; i++) {
            tokens.splice(tokens.indexOf(wordsToRemove[i]), 1);
        }

        return {
            score: score,
            comparative: score / words.length,
            words: words
        };
    }

    function getTokens(str) {
        var cleanPost;
        cleanPost = convert_accented_characters(str); //Substitui acentos.
        cleanPost = cleanPost.replace(/(<([^>]+)>)/ig, ""); //Remove tags html.
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