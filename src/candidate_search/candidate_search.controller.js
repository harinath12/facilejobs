hmapp.controller('candidatesearchController', candidatesearchController);

candidatesearchController.$inject = ['$filter', 'DATA', 'PagerService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function candidatesearchController($filter, DATA, PagerService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {data: DATA, filter: {category: {}, salary: parseInt(DATA.salary.maxsalary)}};

    angular.forEach(DATA.data, function(j){
        $arr = [ 'keywords', 'location'];
        angular.forEach($arr, function(a){
            j[a+'_name'] = [];
            angular.forEach(j[a], function(l){
                var ld = $rootScope.lov_obj[a][l] ? $rootScope.lov_obj[a][l] : '';
                j[a+'_name'].push(ld);
            });
            j[a+'_name'] = j[a+'_name'].join(',');
        });
    });

	$scope.jobs_bk = DATA.data;

    $scope.filteredItems = angular.copy($scope.jobs_bk);

    $scope.pager = {};

	$scope.setPage = function(page) {
        // get pager object from service
        $scope.pager = PagerService.GetPager($scope.filteredItems.length, page, 10);

        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        
        $scope.pager.label = 'jobs';
        // get current page of items
        $scope.jobs = $scope.filteredItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

    $scope.setPage(1);

    $scope.fiterResult = function(){
        $scope.jobs = [];
        $scope.filteredItems = angular.copy($scope.jobs_bk);
        $scope.filteredItems = $filter("filter")($scope.filteredItems, {keywords_name: $scope.pageInfo.filter.title, title: $scope.pageInfo.filter.title, type: $scope.pageInfo.filter.type, location_name: $scope.pageInfo.filter.location});
        
        var cate = [];
        angular.forEach($scope.pageInfo.filter.category, function(v,k){
            if(v){
                cate.push(k);
            }
        });

        if(cate.length){
            $scope.filteredItems = $scope.filteredItems.filter(function(a){
                return cate.indexOf(a.category) != -1;
            });
        }
        
        $scope.filteredItems = $scope.filteredItems.filter(function(a){
            return a.salary <= $scope.pageInfo.filter.salary;
        });

        $scope.setPage(1);
    };

    $scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });

    if($rootScope.search){
        $scope.pageInfo.filter.title = angular.copy($rootScope.search.title);
        $scope.pageInfo.filter.location = angular.copy($rootScope.search.location);
        if($rootScope.search.category){
            $scope.pageInfo.filter.category[$rootScope.search.category] = true;
        }
        
        $rootScope.search = undefined;
        $scope.fiterResult();
    }
}