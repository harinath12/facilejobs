hmapp.controller('jobsearchController', jobsearchController);

jobsearchController.$inject = ['$filter', 'DATA', 'PagerService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobsearchController($filter, DATA, PagerService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	
    $(".filter_btn").on("click",function(e){
        e.preventDefault();
        $(this).toggleClass("active");
        $(".filter_option").slideToggle();
    });

    if($rootScope.loggedInUserInfo.id){
        $(".filter_btn").trigger('click');
    }

    $scope.pageInfo = {data: DATA, filter: {salary: parseInt(DATA.salary.maxsalary)}};

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
	
	$scope.filter_data = angular.copy(DATA.data);
	
	angular.forEach($rootScope.lov, function(v,k){
        angular.forEach(v, function(v1,k1){
            if(k != 'category' && k!='location' && k!='education' && k!='joblevel'){
                $scope.filter_data.push(v1);
            }
        });
    });

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
        
        $scope.filteredItems = $filter("orderBy")($scope.filteredItems, '-is_featured');
        
        $scope.jobs = $scope.filteredItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

    $scope.setPage(1);

    $scope.fiterResult = function(){
        $scope.jobs = [];
        $scope.filteredItems = angular.copy($scope.jobs_bk);
        $scope.filteredItems = $filter("filter")($scope.filteredItems, {category: $scope.pageInfo.filter.category, keywords_name: $scope.pageInfo.filter.title, title: $scope.pageInfo.filter.title, type: $scope.pageInfo.filter.type, location_name: $scope.pageInfo.filter.location});
        
        
        
        $scope.filteredItems = $scope.filteredItems.filter(function(a){
            return parseInt(a.salary) <= parseInt($scope.pageInfo.filter.salary);
        });

        $scope.setPage(1);
    };

    $scope.category = [];
    $scope.category_data = {};
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
        angular.forEach($scope.category, function(v,k){
            $scope.category_data[v.id] = v;
        });
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