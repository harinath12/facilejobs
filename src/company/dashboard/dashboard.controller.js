hmapp.controller('companyDashboardController', companyDashboardController);

companyDashboardController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function companyDashboardController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.dashboard = DATA.data;
}