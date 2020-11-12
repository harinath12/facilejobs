hmapp.controller('pagesController', pagesController);

pagesController.$inject = ['$stateParams', 'DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function pagesController($stateParams, DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
	$scope.page=DATA.data;
	
	$scope.pageid = $stateParams.id;

	if($stateParams.id == 'contact-us'){
		$scope.contactForm = {};
	    $scope.contact_query = function(){
	        ApiService.contact_query($scope.contactForm).then(function(){
	            ApiService.notification('Your query submitted successfully', 'success');
	        });
	    };
	}
	
}