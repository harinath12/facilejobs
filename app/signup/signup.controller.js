hmapp.controller('signupController', signupController);

signupController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function signupController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.signupData = {profile: {}, user_type: '3'};

	$rootScope.$on('signUpType', function(e,d){
		$scope.signupData.user_type = d;
	});

	$scope.register = function(fl){
		if(fl){
			ApiService.register($scope.signupData).then(function(response){
				if (response.status === 'Success') {
					$("#signupModal").modal('hide');
					$("#signinModal").modal('show');
	            } else {
	                ApiService.notification(response.msg, 'error');
	            }
			});
		} else {
			ApiService.notification('Please fill all required fields', 'error');
		}
	};

	$scope.openLogin = function(){
		$("#signupModal").modal('hide');
		$("#signinModal").modal('show');
	};
}