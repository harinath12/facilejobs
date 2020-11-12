hmapp.controller('signupController', signupController);

signupController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function signupController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.signupData = {profile: {}, user_type: $state.params.id};

	$scope.register = function(fl){
		if(fl){
			ApiService.register($scope.signupData).then(function(response){
				if (response.status === 'Success') {
					$state.go('login');
	            } else {
	                ApiService.notification(response.msg, 'error');
	            }
			});
		} else {
			ApiService.notification('Please fill all required fields', 'error');
		}
	};

	$scope.openLogin = function(){
		$state.go('login');
	};
}