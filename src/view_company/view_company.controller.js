hmapp.controller('viewcompanyController', viewcompanyController);

viewcompanyController.$inject = ['$stateParams','DATA','$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function viewcompanyController($stateParams,DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {rating: {}};
	$scope.company = DATA.data;

	$arr = ['location', 'category'];
    angular.forEach($arr, function(a){
        $scope.company[a+'_name'] = [];
        angular.forEach($scope.company[a], function(l){
            var ld = $rootScope.lov_obj[a][l] ? $rootScope.lov_obj[a][l] : '';
            $scope.company[a+'_name'].push(ld);
        });
        $scope.company[a+'_name'] = $scope.company[a+'_name'].join(',');
    });

	$scope.pageInfo.status = DATA.status;

	if($rootScope.loggedInUserInfo.id){
		ApiService.hm_company_view({user: $rootScope.loggedInUserInfo.id, company: $scope.company.basic.id}).then(function(){

		});
	} else {
		var hm_company_view = localStorage.getItem('hm_company_view');
		if(hm_company_view){
			hm_company_view = JSON.parse(hm_company_view);
			if(hm_company_view.indexOf($scope.company.basic.id) == -1){
				hm_company_view.push($scope.company.basic.id);
				ApiService.hm_company_view({user: -1, company: $scope.company.basic.id}).then(function(){

				});
				localStorage.setItem('hm_company_view', JSON.stringify(hm_company_view));
			}
		} else {
			hm_company_view = [];
			hm_company_view.push($scope.company.basic.id);
			ApiService.hm_page_view({user: -1, company: $scope.company.basic.id}).then(function(){

			});
			localStorage.setItem('hm_company_view', JSON.stringify(hm_company_view));
		}
	}

	$scope.addReview = function(fl){
		$scope.pageInfo.submitted = true;
		if(fl){
			$scope.pageInfo.rating.company_id = $scope.company.basic.id;
			$scope.pageInfo.rating.user_id = $rootScope.loggedInUserInfo.id;
			ApiService.hm_add_review($scope.pageInfo.rating).then(function(){
				$('#reviewModal').modal('hide');
				ApiService.notification('Review added successfully', 'Success');
				$state.reload();
			});
		} else {
			ApiService.notification('Please rate and fill all required fields', 'Error');
		}
	};

	$scope.follow = function(){
		var ser = $scope.company.following ? 'hm_unfollow' : 'hm_follow';
		var data = {company_id: $scope.company.basic.id, user_id: $rootScope.loggedInUserInfo.id};

		ApiService[ser](data).then(function(){
			$('#reviewModal').modal('hide');
			ApiService.notification(($scope.company.following ? 'Unfollow' : 'Follow')+'ed this company successfully', 'Success');
			$state.reload();
		});
	};
}