hmapp.controller('companyProfileController', companyProfileController);

companyProfileController.$inject = ['DATA', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function companyProfileController(DATA, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.pageInfo = {};
	$scope.profile = DATA.data;
	if($scope.profile.founded){
		$scope.profile.founded = new Date($scope.profile.founded);
	}

	$rootScope.loggedInUserInfo.profile = $scope.profile;
	
	localStorage.setItem('hmuser', JSON.stringify($rootScope.loggedInUserInfo));

	$scope.save = function(flag){
		if(flag){
			ApiService.company_profile($scope.profile).then(function(){
				ApiService.notification('Profile updated successfully', 'Success');
				$state.reload();
			});
		} else {
			ApiService.notification('Please fill all required fields', 'Error');
		}
	};

	$scope.addGallery = function(){
		if($scope.profile.gallery == undefined){
			$scope.profile.gallery = [];
		}
		$scope.profile.gallery.push($scope.pageInfo.gallery_image);
		ApiService.company_profile($scope.profile).then(function(){
			ApiService.notification('New Image added in gallery', 'Success');
		});
	};

	$scope.delete_gallery = function(ind){
		$scope.profile.gallery.splice(ind, 1);
		ApiService.company_profile($scope.profile).then(function(){
			ApiService.notification('Selected Image removed from gallery', 'Success');
		});
	};

	$scope.change_slug = function(str){
	    str = str.replace(/^\s+|\s+$/g, ''); // trim
	    str = str.toLowerCase();
	  
	    // remove accents, swap ñ for n, etc
	    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
	    var to   = "aaaaaeeeeiiiioooouuuunc------";

	    for (var i=0, l=from.length ; i<l ; i++) {
	        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	    }

	    $scope.profile.slug = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	        .replace(/\s+/g, '-') // collapse whitespace and replace by -
	        .replace(/-+/g, '-'); // collapse dashes
	    
	}

	$scope.category = [];
    ApiService.hm_category().then(function(res){
        $scope.category = res.data;
    });
}