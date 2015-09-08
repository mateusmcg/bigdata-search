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

angular.module('app.common.directives').directive('appLoadHtml', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var elementToLoad = $(element);
            var object = scope.$eval(attrs.appLoadHtml);

            var html = object.content;

            var imageUrls = [];
            if (object.attachments && object.attachments.length > 0) {
                angular.forEach(object.attachments, function (item, index) {
                    if (item.image)
                        imageUrls.push('<br><a href="' + item.url + '"><img class="img-circle" src="' + item.image.url + '" /></a>');
                });
            }

            angular.forEach(imageUrls, function (data, index) {
                html = html + data;
            });

            elementToLoad.html(html);
            $compile(elementToLoad.contents())(scope);
        }
    }
}]);