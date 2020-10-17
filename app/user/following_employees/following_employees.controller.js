hmapp.controller('followingEmployeesController', followingEmployeesController);

followingEmployeesController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function followingEmployeesController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.employees = DATA.data;

	$scope.unfollow = function(id){
		var data = {company_id: id, user_id: $rootScope.loggedInUserInfo.id};

		ApiService.hm_unfollow(data).then(function(){
			ApiService.notification('Unfollowed this company successfully', 'Success');
			$state.reload();
		});
	};
}