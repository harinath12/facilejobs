hmapp.controller('contactusController', contactusController);

contactusController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function contactusController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
$scope.contactForm = {};
    $scope.contact_query = function(){
        ApiService.contact_query($scope.contactForm).then(function(){
            ApiService.notification('Your query submitted successfully', 'success');
            $state.go('contactus')
        });
    };
	
}