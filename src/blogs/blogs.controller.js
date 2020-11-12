hmapp.controller('blogsController', blogsController);

blogsController.$inject = ['$stateParams', 'DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function blogsController($stateParams, DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
	$scope.blogs =DATA.data;

	//console.log($scope.blog);
	
	if($stateParams.id){
		$scope.blogs = $scope.blogs.filter(function(a){
			return a.id == $stateParams.id;
		});
	}
	
	
}