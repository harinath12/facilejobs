hmapp.controller('paymentController', paymentController);

paymentController.$inject = [ '$stateParams', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function paymentController($stateParams, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

}