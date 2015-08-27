'use strict';

angular.module('app.common.directives', []);

angular.module('app.common.directives').directive('appToggle', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.appToggle, function (newValue, oldValue) {
                $(element).toggle();
            })
        }
    }
}]);