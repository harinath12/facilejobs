hmapp.controller('indexController', indexController);



indexController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];



function indexController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {

    var vm = this;



    $scope.user = localStorage.getItem('hwadminuser');



    if(!!$scope.user){

        $rootScope.loggedInUserInfo = JSON.parse($scope.user);

    }



    $rootScope.menu = {};

    $rootScope.currentState = $state.current.name;

    $rootScope.currentStateDetails = $state.current;

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 

        $rootScope.currentState = toState.name;

        $rootScope.currentStateDetails = toState;

        

        if($('body').hasClass('sidebar-open')){

            $('.sidebar-header i.fa-close').trigger('click');

        }

        $('.tooltip').removeClass('show');

        $("html, body").animate({ scrollTop: 0 }, "slow");

    });

    

    $rootScope.$on('$stateChangeStart',

    function (event, toState, toParams, fromState, fromParams, options) { 

        

        if(toState.auth && !$rootScope.loggedInUserInfo){

            event.preventDefault();

            $state.go('login');

        }

    });

    

    

    $scope.copy = function(data){

        return angular.copy(data);

    };

    

    $scope.loadPlugin = function(){

       $timeout(function(){

       	$.Pages.initSidebar();

       }, 100);

    };

    

    $scope.initTooltip = function(){

        $('[data-toggle="tooltip"]').tooltip();

    };

    

    $scope.focus = function(id){

        $timeout(function(){

            $('#'+id).focus();

        }, 200);

    };



    $scope.logout = function(){

        localStorage.removeItem('hwadminuser');

        $rootScope.loggedInUserInfo = {};

        $state.go('login');

    }



    $scope.tinymceOptions = {

    plugins: 'link image code',

    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'

  };

  

    $scope.ckeditorOptions = {

      textInput: 'pretext',

      options: {

        language: 'en',

        allowedContent: true,

        entities: false

      }
      

    };
    

}