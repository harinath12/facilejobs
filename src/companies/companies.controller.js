hmapp.controller('companiesController', companiesController);

companiesController.$inject = ['$filter', 'DATA', 'PagerService', '$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function companiesController($filter, DATA, PagerService, $rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
	$scope.home_data = {};

    ApiService.get_home_data().then(function(res){
        $scope.home_data = res;

        $timeout(function(){
            $('.featured-customer-logos').slick({
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


    $scope.companies = DATA.data;

    $timeout(function(){
        $('.new-customer-logos').slick({
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
}