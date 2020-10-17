hmapp.controller('appliedJobController', appliedJobController);

appliedJobController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function appliedJobController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.applied_jobs = DATA.data;
}