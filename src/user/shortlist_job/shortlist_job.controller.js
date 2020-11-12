hmapp.controller('shortlistJobController', shortlistJobController);

shortlistJobController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function shortlistJobController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
	$scope.category = [];
    $scope.category_data = {};

	$scope.shortlist_jobs = DATA.data;


	angular.forEach($scope.shortlist_jobs, function(v,k){
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