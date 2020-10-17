angular.module('app')
        .controller('categoryController', categoryController);

categoryController.$inject = ['$scope', '$state', '$rootScope', 'APIURL', '$http', 'ApiService']

function categoryController($scope, $state, $rootScope, APIURL, $http, ApiService) {

    $('.select2multiple').select2();


    $('#show-modal').click(function() {
        $('#addNewAppModal').modal('show');
    });

    $scope.pagingSize = 5;
    $scope.dataPerPage = 10;
    $scope.totalItems = [];
    $scope.displayItems = [];

    $scope.pageInfo = {submitted: false};
    $scope.cat_form_data = {};
    $scope.totalItems = [];
    ApiService.hm_category().then(function(res){
    	$scope.totalItems = res.data;
    });

    $scope.save_cat = function(frm){
    	$scope.pageInfo.submitted = true;
    	if(frm.$valid){
    		ApiService.hm_save_category($scope.cat_form_data).then(function(res){
    			$('#addNewAppModal').modal('hide');
    			ApiService.notification(res.msg, 'success');
    			ApiService.hm_category().then(function(res){
			    	$scope.totalItems = res.data;
			    });
			    $scope.cat_form_data = {};
    		});
    	} else {
    		ApiService.notification('Please fill all required fields', 'error');
    	}
    };

    $scope.edit_cat = function(data){
    	$scope.cat_form_data = data;
    	$('#addNewAppModal').modal('show');
    };

    $scope.delete_cat = function(data){
    	$scope.pageInfo.actionId = data;
    	$('#deleteAppModal').modal('show');
    };

    $scope.delete_cat2 = function(id){
    	ApiService.hm_delete_category($scope.pageInfo.actionId).then(function(res){
    		$('#deleteAppModal').modal('hide');
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_category().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };

    $scope.change_status_cat = function(st, id){
    	ApiService.hm_change_status_cat(st, id).then(function(res){
    		ApiService.notification(res.msg, 'success');
    		ApiService.hm_category().then(function(res){
		    	$scope.totalItems = res.data;
		    });
    	});
    };
}