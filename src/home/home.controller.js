hmapp.controller('homeController', homeController);

homeController.$inject = ['$rootScope', '$scope', '$state', 'ApiService', '$window', '$timeout', '$interval'];

function homeController($rootScope, $scope, $state, ApiService, $window, $timeout, $interval) {
 	//$('#carousel-one, #carousel-two').carousel();
     $(document).ready(function() {

    $("#customSwitch1").on('change', function(){
        $(".plan_price").toggleClass("hide");
    });

    $('.banner_slider_1').owlCarousel({
        animateOut: 'fadeOut',
        loop:true,
        margin:10,
        nav:false,
         dots:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    $('.partner_carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplay:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:4
            },
            1000:{
                items:5
            }
        }
    });

           

    $(window).on("scroll", function(){
        var scroll = jQuery(window).scrollTop();
        if(scroll >= 100){
            $(".header_menu").addClass("stick")
        }
        else{
            $(".header_menu").removeClass("stick")    
        }
    });
    

    $(".hamburger ").on("click", function(){
          $(this).toggleClass("is-active");
          $(this).next("ul").slideToggle();
    });    

    $(".filter_btn").on("mouseenter",function(){
        $(this).toggleClass("active");
        $(".filter_option").slideToggle();
    });
    
    $(".fzf_page .form-control").on("focus", function(){
         $(".fzf_page").addClass("focused");
    });

    $(".fzf_page .form-control").blur("focus", function(){
         $(".fzf_page").removeClass("focused");
    });

    /*$(".fzf_page").click(function(){
          $(this).removeClass("focused");
    });*/
    
});


    $(window).on("resize load", function(){
       if ($(window).width() <= 992) {  

               $(".has-sub-menu").on("click",function(){
                  $( this ).children(".sub-menu").slideToggle();
              });

               $(".login_pop > .btn").on("click",function(){
                   $(this).parent(".login_pop").siblings(".login_pop").children(".login_pop_box").fadeOut();
                   $(this).next(".login_pop_box").fadeToggle();
               });    
   

       }   
             
    });    


window.onload = function () {

//Better to construct options first and then pass it as a parameter
var options = {
    title: {
        text: " Your Profile Views"
    },
    animationEnabled: true,
    exportEnabled: true,
    data: [
    {
        type: "spline", //change it to line, area, column, pie, etc
        dataPoints: [
            { x: 10, y: 400 },
            { x: 20, y: 12 },
            { x: 30, y: 8 },
            { x: 40, y: 14 },
            { x: 50, y: 6 },
            { x: 60, y: 24 },
            { x: 70, y: -4 },
            { x: 80, y: 10 }
        ]
    }
    ]
};


}

/*scroll animation*/
AOS.init({
    delay: 100,
    duration: 1000
});
/*end scroll animation*/
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

    $scope.search_res = [];

    ApiService.get_home_data().then(function(res){
        $scope.home_data = res;
        
        angular.forEach(res.data, function(v,k){
            var filter = $scope.search_res.filter(function(a){
                return v.title.trim().toUpperCase() == a.title.trim().toUpperCase();
            });
            if(filter.length == 0){
                $scope.search_res.push(v);
            }
        });

        angular.forEach($rootScope.lov, function(v,k){
            angular.forEach(v, function(v1,k1){
                if(k == 'category'){
                    v1.title = v1.name;
                }
                if(k!='location' && k!='education' && k!='joblevel'){
                     $scope.home_data.data.push(v1);
                }
               
            });
        });
        
       /* angular.forEach($scope.home_data.featured_jobs, function(jj){
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
        });*/
    });
}