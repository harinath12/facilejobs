hmapp.controller('shortlistcandidateController', shortlistcandidateController);

shortlistcandidateController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function shortlistcandidateController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.applicants = DATA.data;

	$scope.remove_shortlist = function(id){
		ApiService.hm_remove_shortlist(id).then(function(res){
            ApiService.notification('User removed from shortlist', 'success');
            $state.reload();
        });
	};
}