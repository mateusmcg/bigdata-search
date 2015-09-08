'use strict';

angular.module('app.common.listas', []);

//Lista das palavras consideradas boas (Pode ter palavras de várias línguas - pt/en/es)
angular.module('app.common.listas').constant('listaBoa', [
    "bom",
]);

//Lista das palavras consideradas ruins (Pode ter palavras de várias línguas - pt/en/es)
angular.module('app.common.listas').constant('listaRuim', [
    "ruim",
]);

//Lista onde será armazenada todas as palavras de todos os posts e quantas vezes elas se repetem.
angular.module('app.common.listas').constant('listaSemStopWords', [
    {
        id: 1,
        palavra: '',
        count: 0
    },
]);