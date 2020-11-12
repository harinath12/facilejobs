hmapp.controller('jobdashboardController', jobdashboardController);

jobdashboardController.$inject = ['DATA' ,'$stateParams', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function jobdashboardController(DATA, $stateParams, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	

    $scope.jobs = DATA.data;

    $scope.pageInfo = {screening_daa: {}};

    $scope.getData = function(){
      ApiService.hm_screening_data($scope.pageInfo.selectedJob).then(function(res){
        $scope.pageInfo.screening_data = res.data
      });
    };

    if($scope.jobs.length){
      $scope.pageInfo.selectedJob = $stateParams.id != 0 ? $stateParams.id : $scope.jobs[0].id;

      $scope.getData();
    }
    
    $scope.onDrop = function(event, ui, status){
      $rootScope.preloader = true;
      ApiService.hm_update_screening($scope.pageInfo.selectedJob, ui.draggable[0].dataset.id, status).then(function(res){
        $rootScope.preloader = false;
        $scope.pageInfo.screening_data = res.data
      })
    };
    
}