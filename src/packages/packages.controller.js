hmapp.controller('packagesController', packagesController);

packagesController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function packagesController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
}