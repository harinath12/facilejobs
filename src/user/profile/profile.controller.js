hmapp.controller('userProfileController', userProfileController);

userProfileController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function userProfileController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.profile = DATA.data;
	if($scope.profile.dob){
		$scope.profile.dob = new Date($scope.profile.dob);
	}

	$rootScope.loggedInUserInfo.profile = $scope.profile;
	localStorage.setItem('hmuser', JSON.stringify($rootScope.loggedInUserInfo));

	$scope.save = function(flag){
		if(flag){
			ApiService.user_profile($scope.profile).then(function(){
				ApiService.notification('Profile updated successfully', 'Success');
				$state.reload();
			});
		} else {
			ApiService.notification('Please fill all required fields', 'Error');
		}
	};
}