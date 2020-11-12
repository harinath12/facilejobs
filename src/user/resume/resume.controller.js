hmapp.controller('resumeController', resumeController);

resumeController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function resumeController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};

	$scope.year = [];

	$scope.profile = DATA.data;

	$rootScope.loggedInUserInfo.profile = $scope.profile;
	localStorage.setItem('hmuser', JSON.stringify($rootScope.loggedInUserInfo));
	
	$scope.month = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Oct'}

	if($scope.profile.education === undefined){
		$scope.profile.education = [];
	}

	if($scope.profile.skills_info === undefined){
		$scope.profile.skills_info = [];
	}

	if($scope.profile.experience_info === undefined){
		$scope.profile.experience_info = [];
	}

	if($scope.profile.resume_list === undefined){
		$scope.profile.resume_list = [];
	}
	if($scope.profile.Adddoc_list === undefined){
		$scope.profile.Adddoc_list = [];
	}


	if($scope.profile.benefits_list === undefined){
		$scope.profile.benefits = {};
	} else {
		$scope.profile.benefits = JSON.parse($scope.profile.benefits_list);
	}

	for(i = 1960; i<=new Date().getFullYear();i++){
		$scope.year.push(i);
	}

	$scope.delete = function(dt, ind){
		$scope.profile[dt].splice(ind, 1);
		$scope.save();
	};

	$scope.saveResume = function(){
		$scope.profile.resume_list.push({resume: $scope.pageInfo.resume, updated_on: new Date().getTime()});
		$scope.save();
	};
	$scope.saveAdddoc = function(){
		$scope.profile.Adddoc_list.push({resume: $scope.pageInfo.adddoc, updated_on: new Date().getTime()});
		$scope.save();
	};

	$scope.pageInfo.exp_form_data = {};

	$scope.add_experience = function(flag){
		$scope.pageInfo.submitted = true;
		if(flag){

			if($scope.pageInfo.exp_form_data.current_org == 'no'){
				if(parseInt($scope.pageInfo.exp_form_data.start_year) < parseInt($scope.pageInfo.exp_form_data.end_year)){
					var year,month;
					year = parseInt($scope.pageInfo.exp_form_data.end_year) - parseInt($scope.pageInfo.exp_form_data.start_year);
					if(parseInt($scope.pageInfo.exp_form_data.start_month) < parseInt($scope.pageInfo.exp_form_data.end_month)){
						month = parseInt($scope.pageInfo.exp_form_data.end_month) - parseInt($scope.pageInfo.exp_form_data.start_month);
					} else {
						year = year - 1;
						month = (12 - parseInt($scope.pageInfo.exp_form_data.start_month)) + parseInt($scope.pageInfo.exp_form_data.end_month);
					}
					$scope.pageInfo.exp_form_data.dif = year+' years '+ (month) +' Months';
				} else if($scope.pageInfo.exp_form_data.start_year == $scope.pageInfo.exp_form_data.end_year && parseInt($scope.pageInfo.exp_form_data.start_month) < parseInt($scope.pageInfo.exp_form_data.end_month)){
					$scope.pageInfo.exp_form_data.dif = 'O years '+ ($scope.pageInfo.exp_form_data.end_month - $scope.pageInfo.exp_form_data.start_month) +' Months';
				} else {
					ApiService.notification('Invalid experience year or month', 'Error');
					return;
				}
			} else {
				$scope.profile.noticeperiod = $scope.pageInfo.exp_form_data.noticeperiod;
			}

			if($scope.pageInfo.index == -1)
				$scope.profile.experience_info.push($scope.pageInfo.exp_form_data);
			else
				$scope.profile.experience_info[$scope.pageInfo.index] = $scope.pageInfo.exp_form_data;
			$('#experienceModal').modal('hide');
			$scope.save();
		} else {
			ApiService.notification('Please fill all required fields', 'Error');
		}
	}

	$scope.pageInfo.edu_form_data = {};

	$scope.add_education = function(flag){
		$scope.pageInfo.submitted = true;
		if(flag){
			if($scope.pageInfo.index == -1)
				$scope.profile.education.push($scope.pageInfo.edu_form_data);
			else
				$scope.profile.education[$scope.pageInfo.index] = $scope.pageInfo.edu_form_data;

			$('#educationModal').modal('hide');
			$scope.save();
		} else {
			ApiService.notification('Please fill all required fields', 'Error');
		}
	}

	$scope.pageInfo.skills_form_data = {};

	$scope.add_skills = function(flag){
		$scope.pageInfo.submitted = true;
		if(flag){
			if($scope.pageInfo.index == -1)
				$scope.profile.skills_info.push($scope.pageInfo.skills_form_data);
			else
				$scope.profile.skills_info[$scope.pageInfo.index] = $scope.pageInfo.skills_form_data;

			$('#skillModal').modal('hide');
			$scope.save();
		} else {
			ApiService.notification('Please fill all required fields', 'Error');
		}
	}

	$scope.save = function(flag){
		$rootScope.preloader = true;
		$scope.profile.benefits_list = JSON.stringify($scope.profile.benefits);
		delete $scope.profile.benefits;
		ApiService.user_profile($scope.profile).then(function(){
			ApiService.notification('Profile updated successfully', 'Success');
			$state.reload();
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