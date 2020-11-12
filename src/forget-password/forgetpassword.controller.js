hmapp.controller('forgetpasswordController', forgetpasswordController);

forgetpasswordController.$inject = ['facebookService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function forgetpasswordController(facebookService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {

	$scope.pageInfo = {};
	$scope.lostPassword = function(){
		ApiService.forgotPassword({email: $scope.pageInfo.email}).then(function(){

		});
	};

}