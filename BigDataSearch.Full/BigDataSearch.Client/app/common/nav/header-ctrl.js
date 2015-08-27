'use strict';

app.controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {

    var vm = this;

    vm.headerModel = {};

    vm.search = search;

    function search() {
        var params = {
            search: vm.headerModel.hashtag,
            count: vm.headerModel.count
        };

        $location.path('/results').search(params);
    };

}]);