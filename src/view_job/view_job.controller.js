hmapp.controller('viewjobController', viewjobController);

viewjobController.$inject = ['DATA', '$stateParams', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function viewjobController(DATA, $stateParams, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.job = DATA.data;

	$arr = ['location', 'industry', 'keywords'];
    angular.forEach($arr, function(a){
        $scope.job[a+'_name'] = [];
        angular.forEach($scope.job[a], function(l){
            var ld = $rootScope.lov_obj[a][l] ? $rootScope.lov_obj[a][l] : '';
            $scope.job[a+'_name'].push(ld);
        });
        $scope.job[a+'_name'] = $scope.job[a+'_name'].join(',');
    });

	if($rootScope.loggedInUserInfo.id){
		ApiService.hm_page_view({user: $rootScope.loggedInUserInfo.id, job: $stateParams.id}).then(function(){

		});
	} else {
		var hw_page_view = localStorage.getItem('hw_page_view');
		if(hw_page_view){
			hw_page_view = JSON.parse(hw_page_view);
			if(hw_page_view.indexOf($stateParams.id) == -1){
				hw_page_view.push($stateParams.id);
				ApiService.hm_page_view({user: -1, job: $stateParams.id}).then(function(){

				});
				localStorage.setItem('hw_page_view', JSON.stringify(hw_page_view));
			}
		} else {
			hw_page_view = [];
			hw_page_view.push($stateParams.id);
			ApiService.hm_page_view({user: -1, job: $stateParams.id}).then(function(){

			});
			localStorage.setItem('hw_page_view', JSON.stringify(hw_page_view));
		}
	}

	$scope.apply_job = function(){
		if($scope.job.applied){
			return;
		}
		if(!$rootScope.loggedInUserInfo.id){
			$rootScope.redirectTo = {state: 'view_job', params: {id: $stateParams.id}};
			$('#signinModal').modal('show');
		} else {
			$('#applyjobModal').modal('show');
		}
	}

	$scope.shortlist_job = function(){
		if($scope.job.shortlisted){
			return;
		}
		if(!$rootScope.loggedInUserInfo.id){
			$rootScope.redirectTo = {state: 'view_job', params: {id: $stateParams.id}};
			$('#signinModal').modal('show');
		} else {
			ApiService.hm_shortlist_job({user: $rootScope.loggedInUserInfo.id, job: $stateParams.id}).then(function(response){
				ApiService.notification('This job added in your shortlist ', 'Success');
				$state.reload();
			});
		}
	}

	$scope.saveResume = function(){
		$scope.pageInfo.list = {resume: $scope.pageInfo.resume, updated_on: new Date().getTime()};
	};

	if($rootScope.loggedInUserInfo.profile && !$rootScope.loggedInUserInfo.profile.resume_list){
		$rootScope.loggedInUserInfo.profile.resume_list = [];
	}

	$scope.apply_now = function(){
		var data = {user: $rootScope.loggedInUserInfo.id, job: $stateParams.id}
		if($scope.pageInfo.list){
			$rootScope.loggedInUserInfo.profile.resume_list.push($scope.pageInfo.list);
			localStorage.setItem('hmuser', JSON.stringify($rootScope.loggedInUserInfo));
			data['resume_list'] = $rootScope.loggedInUserInfo.profile.resume_list;
		}
		$('#applyjobModal').modal('hide');
		ApiService.hm_apply_job(data).then(function(response){
			ApiService.notification('Applied this job successfully', 'Success');
			$state.reload();
		});
	};
}