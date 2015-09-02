'use strict';

angular.module('app.external.components', ['restangular', 'toastr', 'ui.bootstrap', 'LocalStorageModule', 'ngTwitter']);

angular.module('app.components', ['app.common.factory', 'app.common.directives']);

angular.module('app.common', ['app.components', 'app.external.components']);