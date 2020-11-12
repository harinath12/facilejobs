hmapp.controller('viewcandidateController', viewcandidateController);

viewcandidateController.$inject = ['$stateParams', 'DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function viewcandidateController($stateParams,DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	
	$scope.pageInfo = {};

	$scope.candidate = DATA.data;

	if($scope.candidate.benefits_list){
		$scope.candidate.benefits_list=JSON.parse($scope.candidate.benefits_list);
	}

	if($rootScope.loggedInUserInfo.id){
		ApiService.hm_user_view({user: $rootScope.loggedInUserInfo.id, id: $stateParams.id}).then(function(){

		});
	} else {
		var hm_user_view = localStorage.getItem('hm_user_view');
		if(hm_user_view){
			hm_user_view = JSON.parse(hm_user_view);
			if(hm_user_view.indexOf($stateParams.id) == -1){
				hm_user_view.push($stateParams.id);
				ApiService.hm_user_view({user: -1, id: $stateParams.id}).then(function(){

				});
				localStorage.setItem('hm_user_view', JSON.stringify(hm_user_view));
			}
		} else {
			hm_user_view = [];
			hm_user_view.push($stateParams.id);
			ApiService.hm_page_view({user: -1, id: $stateParams.id}).then(function(){

			});
			localStorage.setItem('hm_user_view', JSON.stringify(hm_user_view));
		}
	}

	$scope.shortlist_candidate = function(){
		if($scope.candidate.shortlisted){
			return;
		}
		ApiService.hm_shortlist_candidate($stateParams.id).then(function(){
			ApiService.notification('Shortlisted successfully', 'Success');
			$state.reload();
		});
	};
}