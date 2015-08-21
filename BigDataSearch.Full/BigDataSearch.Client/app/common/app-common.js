'use strict';

angular.module('app.external.components', ['restangular', 'toastr', 'ui.bootstrap']);

angular.module('app.components', []);

angular.module('app.common', ['app.components', 'app.external.components']);