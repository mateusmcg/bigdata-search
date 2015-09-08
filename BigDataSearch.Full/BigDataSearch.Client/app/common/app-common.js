'use strict';

angular.module('app.external.components', ['restangular', 'toastr', 'ui.bootstrap', 'LocalStorageModule', 'ngTwitter']);

angular.module('app.components', ['app.common.factory', 'app.common.directives', 'app.common.listas', 'app.common.stopwords', 'app.common.utilities']);

angular.module('app.common', ['app.components', 'app.external.components']);