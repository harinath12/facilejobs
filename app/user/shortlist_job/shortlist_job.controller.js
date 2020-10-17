hmapp.controller('shortlistJobController', shortlistJobController);

shortlistJobController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function shortlistJobController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.shortlist_jobs = DATA.data;
}