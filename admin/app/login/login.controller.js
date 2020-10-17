angular.module('app')
        .controller('loginController', loginController);

loginController.$inject = ['$scope', '$state', '$rootScope', 'APIURL', '$http', 'ApiService']

function loginController($scope, $state, $rootScope, APIURL, $http, ApiService) {
    
    $rootScope.page = 'login';
    
    $scope.banner = Math.floor(Math.random() * (18 - 1) + 1);

    $scope.form = {};
    $scope.login = {};
    $scope.reset = {};
    $scope.submitted = false;

    $scope.current_state = $state.current.name;
    
    if($scope.current_state == 'resetPwd' && !$state.params.id){
        $state.go('login');
    }
    
    $scope.unsubscribe = {problem: ''};
    $scope.register = {};
    $scope.already_registered = false;
    if($scope.current_state == 'register' && $state.params.id){
        ApiService.validateLink($state.params.id).then(function(response){
            if (response.status === 'Success') {
                $scope.register = response.data;
            } else {
                if(response.msg == 'exist'){
                    $scope.already_registered = true;
                } else {
                   ApiService.notification(response.msg, 'error'); 
                }
            }
        });
    }
    
    $scope.user = localStorage.getItem('hwadminuser');
    
    if($scope.current_state == 'confirm'){
        ApiService.engynn_verify_user_email($state.params.id).then(function(response){
            if (response.status === 'Success') {
                ApiService.notification('Your email verified successfully', 'success');
            } else {
                ApiService.notification(response.msg, 'error');
            }
            
            $state.go('login');
        });
    } else if(!!$scope.user){
        $rootScope.loggedInUserInfo = JSON.parse(localStorage.getItem('hwadminuser'));
        $state.go('dashboard');
    }
    
    $scope.show_preview_noti = function(flag){
        if(flag){
            ApiService.notification('You are in preview mode', 'error');
            return;
        }
    }
    
    $scope.authenticate = function() {
        ApiService.login($scope.login).then(function (response) {
            if (response.status === 'Success') {
                $rootScope.loggedInUserInfo = response.data;
                localStorage.setItem('hwadminuser', JSON.stringify(response.data));
                $rootScope.$broadcast('user_logged_in', response.data);
                $state.go('dashboard');
            } else {
                //$scope.error = response.data.msg;
                ApiService.notification(response.msg, 'error');
            }
        }, function (error) {
            //$scope.error = 'Please try again Later!!';
            ApiService.notification('Please try again Later!!', 'error');
            console.log(error);
        });
    };

    $scope.forgotPassword = function(){
        ApiService.forgotPassword({email: $scope.login.email, url: window.location.origin+window.location.pathname}).then(function (response) {
            if (response.status === 'Success') {
                ApiService.notification('Reset password link sent to your registered email.', 'success');
            } else {
                //$scope.error = response.data.msg;
                ApiService.notification(response.msg, 'error');
            }
        }, function (error) {
            //$scope.error = 'Please try again Later!!';
            ApiService.notification('Please try again Later!!', 'error');
            console.log(error);
        });
    };

    $scope.resetPassword = function(){
        ApiService.resetPassword({reset: $state.params.id, user_pass: $scope.reset.password}).then(function (response) {
            if (response.status === 'Success') {
                ApiService.notification('Password reset Successfullly. Login with your new password', 'success');
                $state.go('login');
            } else {
                //$scope.error = response.data.msg;
                ApiService.notification(response.msg, 'error');
            }
        }, function (error) {
            //$scope.error = 'Please try again Later!!';
            ApiService.notification('Please try again Later!!', 'error');
            console.log(error);
        });
    };

    $scope.registerForm = function(){
        ApiService.register($scope.register).then(function (response) {
            if (response.status === 'Success') {
                ApiService.notification('Registered successfully', 'success');
                $state.go('login');
            } else {
                //$scope.error = response.data.msg;
                ApiService.notification(response.msg, 'error');
            }
        }, function (error) {
            //$scope.error = 'Please try again Later!!';
            ApiService.notification('Please try again Later!!', 'error');
            console.log(error);
        });
    };
    
    $scope.reportForm = function(){
        $scope.unsubscribe.eId = $state.params.id;
        ApiService.reportEmail($scope.unsubscribe).then(function (response) {
            if (response.status === 'Success') {
                ApiService.notification('Your report submitted successfully.', 'success');
                $state.go('login');
            } else {
            }
        }, function (error) {
            //$scope.error = 'Please try again Later!!';
            ApiService.notification('Please try again Later!!', 'error');
            console.log(error);
        });
    };
}