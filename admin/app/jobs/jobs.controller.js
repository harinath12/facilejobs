angular.module('app')
        .controller('jobsController', jobsController);

jobsController.$inject = ['$scope', '$state', '$rootScope', 'APIURL', '$http', 'ApiService']

function jobsController($scope, $state, $rootScope, APIURL, $http, ApiService) {

    $scope.pageInfo = {submitted: false};
    $('.datepicker').datepicker();
    $('#show-modal').click(function() {
        $('#addNewAppModal').modal('show');
        $scope.pageInfo.showForm = true;
        $scope.job_form_data = {industry: {}};
        if(!$scope.$$phase) {$scope.$apply();}
    });

    $("#addNewAppModal").on("hidden.bs.modal", function () {
        $scope.pageInfo.showForm = false;
        if(!$scope.$$phase) {$scope.$apply();}
    });

    $scope.lov = {};
    ApiService.get_all_lovs().then(function(res){
        $scope.lov = res;
    });

    $scope.pagingSize = 5;
    $scope.dataPerPage = 10;
    $scope.totalItems = [];
    $scope.displayItems = [];

    
    $scope.job_form_data = {industry: {}};
    $scope.totalItems = [];
    ApiService.hm_jobs().then(function(res){
    	$scope.totalItems = res.data;
    });

    $scope.save_job = function(frm){
    	$scope.pageInfo.submitted = true;
    	if(frm.$valid){
    		ApiService.hm_save_job($scope.job_form_data).then(function(res){
    			$('#addNewAppModal').modal('hide');
    			ApiService.notification(res.msg, 'success');
    			ApiService.hm_jobs().then(function(res){
			    	$scope.totalItems = res.data;
			    });
			    $scope.job_form_data = {industry: {}};
    		});
    	} else {
    		ApiService.notification('Please fill all required fields', 'error');
    	}
    };

    $scope.edit_job = function(data){
    	$scope.job_form_data = data;
    	$scope.job_form_data.last_date = new Date($scope.job_form_data.last_date);
    	$('#addNewAppModal').modal('show');
        $scope.pageInfo.showForm = true;
    };

    $scope.delete_job = function(data){
    	$scope.pageInfo.actionId = data;
    	$('#deleteAppModal').modal('show');
    };

    $scope.delete_job2 = function(id){
    	ApiService.hm_delete_job($scope.pageInfo.actionId).then(function(res){
    		$('#deleteAppModal').modal('hide');
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_jobs().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };

    $scope.change_status = function(st, id){
    	ApiService.hm_change_status(st, id).then(function(res){
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_jobs().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };

    $scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });

    $scope.education = [];
    ApiService.hm_education().then(function(res){
        $scope.education = res.data;
    });

    $scope.industry = [];
    ApiService.hm_industry().then(function(res){
        $scope.industry = res.data;
    });

    $scope.joblevel = [];
    ApiService.hm_joblevel().then(function(res){
        $scope.joblevel = res.data;
    });

     $scope.location = [];
    ApiService.hm_location().then(function(res){
        $scope.location = res.data;
    });


}