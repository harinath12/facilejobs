angular.module('app')
        .controller('usersController', usersController);

usersController.$inject = ['$scope', '$state', '$rootScope', 'APIURL', '$http', 'ApiService']

function usersController($scope, $state, $rootScope, APIURL, $http, ApiService) {

    $('.select2multiple').select2();

    $scope.pagingSize = 5;
    $scope.dataPerPage = 10;
    $scope.totalItems = [];
    $scope.displayItems = [];

    $scope.pageInfo = {submitted: false};
    $scope.form_data = {};
    $scope.totalItems = [];
    ApiService.hm_users().then(function(res){
    	$scope.totalItems = res.data;
    });

    $scope.save_user = function(frm){
    	$scope.pageInfo.submitted = true;
    	if(frm.$valid){
    		ApiService.hm_save_user($scope.form_data).then(function(res){
    			$('#addNewAppModal').modal('hide');
    			ApiService.notification(res.msg, 'success');
    			ApiService.hm_users().then(function(res){
			    	$scope.totalItems = res.data;
			    });
			    $scope.form_data = {};
    		});
    	} else {
    		ApiService.notification('Please fill all required fields', 'error');
    	}
    };

    $scope.edit = function(data){
    	$scope.form_data = data;
    	$('#addNewAppModal').modal('show');
    };

    $scope.delete = function(data){
    	$scope.pageInfo.actionId = data;
    	$('#deleteAppModal').modal('show');
    };

    $scope.delete2 = function(id){
    	ApiService.hm_delete_user($scope.pageInfo.actionId).then(function(res){
    		$('#deleteAppModal').modal('hide');
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_users().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };

    $scope.change_status = function(st, id){
    	ApiService.hm_change_user_status(st, id).then(function(res){
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_users().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };

    $scope.skills=[];
    ApiService.hm_skills().then(function(res){
        $scope.skills = res.data;
    });

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