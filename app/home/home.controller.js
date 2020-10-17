hmapp.controller('homeController', homeController);

homeController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function homeController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
 	//$('#carousel-one, #carousel-two').carousel();

 	$(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 

    $(".show-toast").click(function(){
        $("#myToast").toast({ delay: 3000 });
        $("#myToast").toast('show');
    }); 

    $scope.pageInfo = {search: {}};

    var hw_search_title = localStorage.getItem('hw_search_title');
    $scope.recent_search_title = hw_search_title ? JSON.parse(hw_search_title) : [];

    var hw_search_location = localStorage.getItem('hw_search_location');
    $scope.recent_search_location = hw_search_location ? JSON.parse(hw_search_location) : [];

    $scope.search_job = function(){
        $rootScope.search = angular.copy($scope.pageInfo.search);

        if($rootScope.search.title){
            if($scope.recent_search_title.indexOf($rootScope.search.title) == -1){
                $scope.recent_search_title.push($rootScope.search.title);
                localStorage.setItem('hw_search_title', JSON.stringify($scope.recent_search_title));
            }
        }

        if($rootScope.search.location){
            if($scope.recent_search_location.indexOf($rootScope.search.location) == -1){
                $scope.recent_search_location.push($rootScope.search.location);
                localStorage.setItem('hw_search_location', JSON.stringify($scope.recent_search_location));
            }
        }

        $state.go('job_search');
    };

    $scope.search_job2 = function(tt){
        if(tt.type == 'category'){
            $rootScope.search = {category: tt.id};
        } else {
            $rootScope.search = {title: tt.title};
        }

        if(tt.title){
            if($scope.recent_search_title.indexOf(tt.title) == -1){
                $scope.recent_search_title.push(tt.title);
                localStorage.setItem('hw_search_title', JSON.stringify($scope.recent_search_title));
            }
        }

        $state.go('job_search');
    };

    $scope.home_data = {};

    ApiService.get_home_data().then(function(res){
        $scope.home_data = res;
        angular.forEach($scope.home_data.featured_jobs, function(jj){
            angular.forEach(jj, function(j){
                $arr = ['location'];
                angular.forEach($arr, function(a){
                    j[a+'_name'] = [];
                    angular.forEach(j[a], function(l){
                        var ld = $rootScope.lov_obj[a][l] ? $rootScope.lov_obj[a][l] : '';
                        j[a+'_name'].push(ld);
                    });
                    j[a+'_name'] = j[a+'_name'].join(',');
                });
            });
        });

        $timeout(function(){
            $('.customer-logos').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1500,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 3
                    }
                }]
            });
        }, 1000);
    });
}