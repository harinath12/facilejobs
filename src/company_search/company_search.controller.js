hmapp.controller('companysearchController', companysearchController);

companysearchController.$inject = ['$filter', 'DATA', 'PagerService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function companysearchController($filter, DATA, PagerService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
    $scope.home_data = {};

    ApiService.get_home_data().then(function(res){
        $scope.home_data = res;
    });
}