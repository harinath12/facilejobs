hmapp.controller('appliedJobController', appliedJobController);

appliedJobController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function appliedJobController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.applied_jobs = DATA.data;
	$scope.category = [];
    $scope.category_data = {};


    angular.forEach($scope.applied_jobs, function(v,k){
        $arr = ['location', 'industry', 'keywords'];
        angular.forEach($arr, function(a){
            v[a+'_name'] = [];
            angular.forEach(v[a], function(l){
                var ld = $rootScope.lov_obj[a][l] ? $rootScope.lov_obj[a][l] : '';
                v[a+'_name'].push(ld);
            });
            v[a+'_name'] = v[a+'_name'].join(',');
        });
    });
    

    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
        angular.forEach($scope.category, function(v,k){
            $scope.category_data[v.id] = v;
        });
    });
}