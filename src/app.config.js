var hmapp = angular.module('app', 

    ['ngRoute', 'ui.router', 'ui.bootstrap', 'ui.tinymce', 'ckeditor'])

.value('APIURL', 'http://localhost/Boopathi/facilejobs/admin/api/?action=');

/*.value('APIURL', 'https://facilejobs.com/admin/api/?action=');*/

hmapp

.config(routes);



function routes($stateProvider, $urlRouterProvider, $locationProvider) {



    // default route

    $urlRouterProvider

        .when('', '/home').otherwise('/home');
    
    

    var states = [

        {

            name: 'home',

            label: 'Home',

            auth: false,

            restricted:false,

            url: '/home',

            templateUrl: 'src/home/home.html',

            controller: 'homeController'

        },

        {

            name: 'pages',

            label: 'Page',

            auth: false,

            restricted:false,

            url: '/pages/:id',

            templateUrl: 'src/pages/pages.html',

            controller: 'pagesController',

            resolve: {

                DATA: function(ApiService, $stateParams) {

                  return ApiService.pages($stateParams.id);

                }

            }

        },
        {

            name: 'blogs',

            label: 'Blogs',

            auth: false,

            restricted:false,

            url: '/blogs/',

            templateUrl: 'src/blogs/blog_list.html',

            controller: 'blogsController',

            resolve: {

                DATA: function(ApiService, $stateParams) {

                  return ApiService.blogs($stateParams.id);

                }

            }

        },
        {

            name: 'blog',

            label: 'Blog',

            auth: false,

            restricted:false,

            url: '/blog/:id',

            templateUrl: 'src/blogs/blog.html',

            controller: 'blogsController',

            resolve: {

                DATA: function(ApiService, $stateParams) {

                  return ApiService.blogs($stateParams.id);

                }

            }

        },

        {

            name: 'user',

            label: 'User',

            auth: true,

            role:'3',

            restricted:false,

            url: '/user',

            templateUrl: 'src/user/user.html',

            controller: 'userController'

        },

        {

            name: 'user.dashboard',

            label: 'Dashboard',

            auth: true,

            role:'3',

            restricted:false,

            url: '/dashboard',

            templateUrl: 'src/user/dashboard/dashboard.html',

            controller: 'userDashboardController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_dashboard();

                }

            }

        },

        {

            name: 'user.profile',

            label: 'Profile',


            auth: true,
            role:'3',

            restricted:false,

            url: '/profile',

            templateUrl: 'src/user/profile/profile.html',

            controller: 'userProfileController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_profile({});

                }

            }

        },

        {

            name: 'user.resume',

            label: 'Resume',

            auth: true,
            role:'3',

            restricted:false,

            url: '/resume',

            templateUrl: 'src/user/resume/resume.html',

            controller: 'resumeController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_profile({});

                }

            }

        },

        {

            name: 'user.applied_job',

            label: 'applied Job',

            auth: true,
            role:'3',

            restricted:false,

            url: '/applied_job',

            templateUrl: 'src/user/applied_job/applied_job.html',

            controller: 'appliedJobController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_applied_job();

                }

            }

        },

        {

            name: 'user.shortlist_job',

            label: 'Shortlist Job',

            auth: true,
            role:'3',

            restricted:false,

            url: '/shortlist_job',

            templateUrl: 'src/user/shortlist_job/shortlist_job.html',

            controller: 'shortlistJobController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_shortlist_job();

                }

            }

        },

        {

            name: 'user.following_employers',

            label: 'Following Employers',

            auth: true,
            role:'3',

            restricted:false,

            url: '/following_employers',

            templateUrl: 'src/user/following_employers/following_employers.html',

            controller: 'followingEmployersController',

            resolve: {

                DATA: function($stateParams, ApiService){

                    return ApiService.hm_following_list();

                }

            }

        },

        {

            name: 'user.alerts',

            label: 'Alerts',

            auth: true,
            role:'3',

            restricted:false,

            url: '/alerts',

            templateUrl: 'src/user/alerts/alerts.html',

            controller: 'userAlertsController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_alerts();

                }

            }

        },

        {

            name: 'user.settings',

            label: 'Settings',

            auth: true,
            role:'3',

            restricted:false,

            url: '/settings',

            templateUrl: 'src/user/settings/settings.html',

            controller: 'userSettingsController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.user_alerts();

                }

            }

        },

        {

            name: 'company',

            label: 'Company',

            auth: true,
            role:'2',

            restricted:false,

            url: '/company',

            templateUrl: 'src/company/company.html',

            controller: 'companyController'

        },

        {

            name: 'company.dashboard',

            label: 'Dashboard',

            auth: true,
            role:'2',
            restricted:false,

            url: '/dashboard',

            templateUrl: 'src/company/dashboard/dashboard.html',

            controller: 'companyDashboardController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.company_dashboard();

                }

            }

        },

        {

            name: 'company.profile',

            label: 'Profile',

            auth: true,
            role:'2',

            restricted:false,

            url: '/profile',

            templateUrl: 'src/company/profile/profile.html',

            controller: 'companyProfileController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.company_profile({});

                }

            }

        },

        {

            name: 'company.jobs',

            label: 'Jobs',

            auth: true,
            role:'2',

            restricted:false,

            url: '/jobs',

            templateUrl: 'src/company/jobs/jobs.html',

            controller: 'jobsController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.company_jobs();

                }

            }

        },

        {

            name: 'company.jobpost',

            label: 'Post Job',

            auth: true,
            role:'2',

            restricted:false,

            url: '/jobpost',

            templateUrl: 'src/company/jobpost/jobpost.html',

            controller: 'jobpostController',

            resolve: {

                DATA: function(ApiService) {

                  return ;

                }

            }

        },

        {

            name: 'company.editjob',

            label: 'Post Job',

            auth: true,
            role:'2',

            restricted:false,

            url: '/jobpost/:id',

            templateUrl: 'src/company/jobpost/jobpost.html',

            controller: 'jobpostController',

            resolve: {

                DATA: function(ApiService, $stateParams) {

                  return ApiService.view_job($stateParams.id);

                }

            }

        },

        {

            name: 'company.jobapplicants',

            label: 'Job Applicants',

            auth: true,
            role:'2',

            restricted:false,

            url: '/jobapplicants',

            templateUrl: 'src/company/jobapplicants/jobapplicants.html',

            controller: 'jobapplicantsController'

        },

        {

            name: 'company.shortlist_candidates',

            label: 'Shortlisted Candidates',

            auth: true,
            role:'2',

            restricted:false,

            url: '/shortlist_candidates',

            templateUrl: 'src/company/shortlist_candidates/shortlist_candidates.html',

            controller: 'shortlistcandidateController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.hm_company_shortlist();

                }

            }

        },

        {

            name: 'company.following_employees',

            label: 'Following Employees',

            auth: true,
            role:'2',

            restricted:false,

            url: '/following_employees',

            templateUrl: 'src/company/following_employees/following_employees.html',

            controller: 'followingEmployeesController',

            resolve: {

                DATA: function($stateParams, ApiService){

                    return ApiService.hm_following_list();

                }

            }

        },

        {

            name: 'company.alerts',

            label: 'Alerts',

            auth: true,
            role:'2',

            restricted:false,

            url: '/alerts',

            templateUrl: 'src/company/alerts/alerts.html',

            controller: 'companyAlertsController'

        },

        {

            name: 'company.settings',

            label: 'Settings',

            auth: true,
            role:'2',

            restricted:false,

            url: '/settings',

            templateUrl: 'src/company/settings/settings.html',

            controller: 'companySettingsController'

        },

        {

            name: 'company.mypackage',

            label: 'My Package',

            auth: true,
            role:'2',

            restricted:false,

            url: '/mypackage',

            templateUrl: 'src/company/mypackage/mypackage.html',

            controller: 'companyMypackageController'

        },

        {

            name: 'job-dashboard',

            label: 'Job Dashboard',

            auth: true,
            
            role:'2',

            restricted:false,

            url: '/job-dashboard/:id',

            templateUrl: 'src/job-dashboard/job-dashboard.html',

            controller: 'jobdashboardController',

            resolve: {

                DATA: function(ApiService) {

                  return ApiService.company_jobs();

                }

            }

        },

        {

            name: 'companies',

            label: 'Companies',

            auth: false,

            restricted:false,

            url: '/companies',

            templateUrl: 'src/companies/companies.html',

            controller: 'companiesController',

            resolve: {

                DATA: function($stateParams, ApiService){

                    return ApiService.hm_company();

                }

            }

        },

        {

            name: 'job_search',

            label: 'Job Search',

            auth: false,

            restricted:false,

            url: '/job_search',

            templateUrl: 'src/job_search/job_search.html',

            controller: 'jobsearchController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.job_search({});

                }

            }

        },

        {

            name: 'candidate_search',

            label: 'Search Candidates',

            auth: false,

            restricted:false,

            url: '/candidate_search',

            templateUrl: 'src/candidate_search/candidate_search.html',

            controller: 'candidatesearchController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.job_search({});

                }

            }

        },

        {

            name: 'view_job',

            label: 'Jobs',

            auth: false,

            restricted:false,

            url: '/view_job/:id',

            templateUrl: 'src/view_job/view_job.html',

            controller: 'viewjobController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.view_job($stateParams.id);

                }

            }

        },

        {

            name: 'view_company',

            label: 'View Company',

            auth: false,

            restricted:false,

            url: '/view_company/:id',

            templateUrl: 'src/view_company/view_company.html',

            controller: 'viewcompanyController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.view_company($stateParams.id);

                }

            }

        },

        {

            name: 'view_candidate',

            label: 'View Candidates',

            auth: false,

            restricted:false,

            url: '/view_candidate/:id',

            templateUrl: 'src/view_candidate/view_candidate.html',

            controller: 'viewcandidateController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.view_candidate($stateParams.id);

                }

            }

        },

        {

            name: 'contact',

            label: 'Contact Us',

            auth: false,

            restricted:false,

            url: '/contactus/',

            templateUrl: 'src/contactus/contactus.html',

            controller: 'contactusController',

            resolve: {

                DATA: function($stateParams, ApiService) {

                  return ApiService.contact_query($scope.contactForm);

                }

            }

        },

        {

            name: 'packages',

            label: 'Packages',

            auth: false,

            restricted:false,

            url: '/packages/',

            templateUrl: 'src/packages/packages.html',

            controller: 'packagesController',

        },

        {

            name: 'company.payment',

            label: 'Payment',

            auth: true,

            restricted:false,

            url: '/payment/',

            templateUrl: 'src/payment/payment.html',

            controller: 'paymentController',

        },

        {

            name: 'company_search',

            label: 'Company Search',

            auth: false,

            restricted:false,

            url: '/company_search/',

            templateUrl: 'src/company_search/company_search.html',

            controller: 'companysearchController',

        },

        {

            name: 'login',

            label: 'Login',

            auth: false,

            restricted:false,

            url: '/login/',

            templateUrl: 'src/login/login.html',

            controller: 'loginController',

        },
        {

            name: 'forget-password',

            label: 'Login',

            auth: false,

            restricted:false,

            url: '/forget-password/',

            templateUrl: 'src/forget-password/forgetpassword.html',

            controller: 'forgetpasswordController',

        },

        {

            name: 'signup',

            label: 'Signup',

            auth: false,

            restricted:false,

            url: '/signup/:id',

            templateUrl: 'src/signup/signup.html',

            controller: 'signupController',

        }

    ]



    angular.forEach(states, function (state) {

        $stateProvider.state(state);

    });

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);

};





hmapp.directive('ngEnter', function () {

    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {

            if (event.which === 13) {

                scope.$apply(function () {

                    scope.$eval(attrs.ngEnter);

                });

                event.preventDefault();

            }

        });

    };

});



hmapp.directive('ngEscape', function () {

    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {

            if (event.key === "Escape") {

                scope.$apply(function () {

                    scope.$eval(attrs.ngEscape);

                });

                event.preventDefault();

            }

        });

    };

});



hmapp.directive('ngUparrow', function () {

    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {

            if (event.which === 38) {

                scope.$apply(function () {

                    scope.$eval(attrs.ngUparrow);

                });

                event.preventDefault();

            }

        });

    };

});



hmapp.directive('ngDownarrow', function () {

    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {

            if (event.which === 40) {

                scope.$apply(function () {

                    scope.$eval(attrs.ngDownarrow);

                });

                event.preventDefault();

            }

        });

    };

});



hmapp.directive("repeatEnd", function(){

    return {

        restrict: "A",

        link: function (scope, element, attrs) {

            if (scope.$last) {

                scope.$eval(attrs.repeatEnd);

            }

        }

    };

});



hmapp.directive("droppable", function($parse){

    return {

        restrict: "A",

        link: function (scope, element, attrs) {

            var fn = $parse(attrs.ngDrop);

            $(element).droppable({

              accept: ".user-short-info",

              classes: {

                "ui-droppable-active": "ui-state-highlight"

              },

              drop: function( event, ui ) {

                scope.$apply(function() {

                    fn(scope, {event, ui});

                });

              }

            });

        }

    };

});



hmapp.directive("draggable", function($parse){

    return {

        restrict: "A",

        link: function (scope, element, attrs) {

            $(element).draggable({

              cancel: "a.ui-icon", // clicking an icon won't initiate dragging

              revert: "invalid", // when not dropped, the item will revert back to its initial position

              containment: "document",

              helper: "clone",

              cursor: "move",

              classes: {

                "ui-draggable": "highlight"

              }

            });

        }

    };

});



hmapp.directive("datePicker", function(){

    return {

        restrict: "A",

        require: '?ngModel',

        link: function (scope, element, attrs, ngModel) {

            $(element).datepicker({'format': 'yyyy-mm-dd', startDate: new Date()});

            

            $(element).on('change', function(ev){

                ngModel.$setViewValue($(this).val());

                $(this).trigger('change');

                $(this).datepicker('hide');

                if(!scope.$$phase) {

                    scope.$apply();

                }

            });

        }

    };

});



hmapp.directive("cdatePicker", function(){

    return {

        restrict: "A",

        require: '?ngModel',

        link: function (scope, element, attrs, ngModel) {

            $(element).datepicker({'format': 'yyyy-mm-dd'});

            

            $(element).on('changeDate', function(ev){

                ngModel.$setViewValue($(this).val());

                $(this).trigger('change');

                $(this).datepicker('hide');

            });

        }

    };

});



hmapp.directive("select2", function(){

    return {

        restrict: "A",

        require: '?ngModel',

        link: function (scope, element, attrs, ngModel) {

            $(element).select2({matcher: function(params, data) {

                params.term = params.term || '';

                if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0) {

                    return data;

                }

                return false;

            }});



            $(element).on("select2:select", function (e) { 

                ngModel.$setViewValue($(this).val());

                $(this).trigger('change');

            });

        }

    };

});



hmapp.directive("carousel", function($timeout){

    return {

        restrict: "A",

        link: function (scope, element, attrs) {

            $timeout(function(){$(element).carousel();},1000);

        }

    };

});



hmapp.directive('ngRightClick', function($parse) {

    return function(scope, element, attrs) {

        var fn = $parse(attrs.ngRightClick);

        element.bind('contextmenu', function(event) {

            scope.$apply(function() {

                event.preventDefault();

                fn(scope, {$event:event});

            });

        });

    };

});



hmapp.directive('triggerUpload', function() {

  return {

    restrict: 'A',

    link: function (scope, element, attrs) {

        element.bind('click', function(event){

            $("#"+attrs['triggerUpload']).trigger('click');

        }); 

    }

  };

});



hmapp.directive('fileUpload', function(ApiService, $rootScope, $timeout, $state, $q) {

  return {

    restrict: 'A',

    require: '?ngModel',

    link: function (scope, element, attrs, ngModel) {

        element.bind('change', function(event){

        	var file = event.target.files[0];

        	var ext = file.name.split('.').pop();

            if(attrs.format){

                format = attrs.format.split(',');

                if(format.indexOf(ext.toLowerCase()) == -1){

                    ApiService.notification('Invalid format', 'Error');

                    return;

                }

            }



            if(file.size > 2097152){

                ApiService.notification('Max upload size is 2MB', 'Error');

                return;

            }

        	var fileReader = new FileReader();

        	fileReader.onload = function(){

        		ApiService.upload({name: file.name, ext: ext, data: fileReader.result}).then(function (res) {

                    ngModel.$setViewValue(res['data']);



                    if(attrs.afterUpload){

                        scope.$eval(attrs.afterUpload);

                    }

                });

        	}

        	fileReader.readAsDataURL( file );



        }); 

    }

  };

});



hmapp.filter('checkurl', function ($rootScope) {

  return function (item) {

    var res = (item || "").replace(

        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,

        function(match, space, url){

          var hyperlink = url;

          if (!hyperlink.match('^https?:\/\/')) {

            hyperlink = 'http://' + hyperlink;

          }

          return space + '<a class="linkurl" target="_blank" href="' + hyperlink + '">' + url + '</a>';

        }

      );

     

    var tmpa = document.createElement("div");

    $(tmpa).html(res);

    

    var tagged_users = $(tmpa).text().split(' ').filter(function(re){

        return re.indexOf('@') === 0 && !!$rootScope.company_user_login_by_name[re.replace('@', '')];

    });

    

    angular.forEach(tagged_users, function(v, k) {

        res = res.replace(v, '<a class="linkurl" href="#!/profile/'+v.replace('@', '')+'">'+$rootScope.company_user_login_by_name[v.replace('@', '')]+'</a>');

    });

     

    return res;

  };

});



hmapp.filter('notiName', function ($rootScope) {

  return function (item, noti) {

      if($rootScope.company_user[noti.triggered_by]){

            var res = (item || "").replace('[name]', '<strong>'+$rootScope.company_user[noti.triggered_by].display_name+'</strong>');

            res = res.replace('[event_name]', noti.title);

            res = res.replace('[title]', noti.title);

            res = res.replace('[notes]', noti.notes);

            res = res.replace('[feedname]', noti.notes);

            return res;

      } else {

          return "";

      }

  };

});



hmapp.filter('to_trusted', ['$sce', function($sce){

    return function(text) {

        return $sce.trustAsHtml(text);

    };

}]);



hmapp.filter('secure_url', ['$sce', function($sce){

    return function(text) {

        return $sce.trustAsResourceUrl(text);

    };

}]);



hmapp.filter('shortContent', function () {

    return function (item, maxLength) {

        if((item || "").length < maxLength){

            return item;

        } else {

            var trimmedString = (item || "").substr(0, maxLength);

            return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))+'...';

        }

    }

});



hmapp.filter('youtubeurl', function () {

  return function (item) {

    var regex = /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi;

    var found = (item || "").match(regex);

    

    var $youtubeurl= '';

    

    if(Array.isArray(found)){

        angular.forEach(found, function(v,k){

            var tmpv = [];

            if(v.indexOf('youtube.com/watch?v=') !== -1){

                tmpv = v.split('youtube.com/watch?v=');

            } else if(v.indexOf('youtu.be/') !== -1){

                tmpv = v.split('youtu.be/');

            }

            

            if(tmpv.length == 2 && tmpv[1].trim()){

                $youtubeurl += '<div class="youtube-video">'+

                    '<iframe width="470" height="315"src=" https://www.youtube.com/embed/'+ tmpv[1].trim() +'">'+

                    '</iframe>'+

                '</div>';

            }

        });

    }

    

    return $youtubeurl;

  };

});



Object.size = function(obj) {

    var size = 0, key;

    for (key in obj) {

        if (obj.hasOwnProperty(key)) size++;

    }

    return size;

};



hmapp.

    filter('timeago', function() {

        return function(input, p_allowFuture) {

            var substitute = function (stringOrFunction, number, strings) {

                    var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;

                    var value = (strings.numbers && strings.numbers[number]) || number;

                    return string.replace(/%d/i, value);

                },

                nowTime = (new Date()).getTime(),

                date = (new Date(input)).getTime(),

                //refreshMillis= 6e4, //A minute

                allowFuture = p_allowFuture || false,

                strings= {

                    prefixAgo: null,

                    prefixFromNow: null,

                    suffixAgo: "ago",

                    suffixFromNow: "from now",

                    seconds: "few seconds",

                    minute: "a minute",

                    minutes: "%d minutes",

                    hour: "an hour",

                    hours: "%d hours",

                    day: "a day",

                    days: "%d days",

                    month: "a month",

                    months: "%d months",

                    year: "a year",

                    years: "%d years"

                },

                dateDifference = nowTime - date,

                words,

                seconds = Math.abs(dateDifference) / 1000,

                minutes = seconds / 60,

                hours = minutes / 60,

                days = hours / 24,

                years = days / 365,

                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,

            

                // var strings = this.settings.strings;

                prefix = strings.prefixAgo,

                suffix = strings.suffixAgo;

                

            if (allowFuture) {

                if (dateDifference < 0) {

                    prefix = strings.prefixFromNow;

                    suffix = strings.suffixFromNow;

                }

            }



            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||

            seconds < 90 && substitute(strings.minute, 1, strings) ||

            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||

            minutes < 90 && substitute(strings.hour, 1, strings) ||

            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||

            hours < 42 && substitute(strings.day, 1, strings) ||

            days < 30 && substitute(strings.days, Math.round(days), strings) ||

            days < 45 && substitute(strings.month, 1, strings) ||

            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||

            years < 1.5 && substitute(strings.year, 1, strings) ||

            substitute(strings.years, Math.round(years), strings);



            return $.trim([prefix, words, suffix].join(separator));

            // conditional based on optional argument

            // if (somethingElse) {

            //     out = out.toUpperCase();

            // }

            // return out;

        }

    })

    

.filter('bytes', function() {

	return function(bytes, precision) {

		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';

		if (typeof precision === 'undefined') precision = 1;

		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],

			number = Math.floor(Math.log(bytes) / Math.log(1024));

		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];

	}

});



Object.equals = function( x, y ) {

  if ( x === y ) return true;

    // if both x and y are null or undefined and exactly the same



  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;

    // if they are not strictly equal, they both need to be Objects



  if ( x.constructor !== y.constructor ) return false;

    // they must have the exact same prototype chain, the closest we can do is

    // test there constructor.



  for ( var p in x ) {



    if(p == 'collapsed') continue;



    if ( ! x.hasOwnProperty( p ) ) continue;

      // other properties were tested using x.constructor === y.constructor



    if ( ! y.hasOwnProperty( p ) ) return false;

      // allows to compare x[ p ] and y[ p ] when set to undefined



    if ( x[ p ] === y[ p ] ) continue;

      // if they have the same strict value or identity then they are equal



    if ( typeof( x[ p ] ) !== "object" ) return false;

      // Numbers, Strings, Functions, Booleans must be strictly equal



    if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;

      // Objects and Arrays must be tested recursively

  }



  for ( p in y ) {



    if(p == 'collapsed') continue;



    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;

      // allows x[ p ] to be set to undefined

  }

  return true;

}



var compareTo = function() {

    return {

        require: "ngModel",

        scope: {

            otherModelValue: "=compareTo"

        },

        link: function(scope, element, attributes, ngModel) {

             

            ngModel.$validators.compareTo = function(modelValue) {

                return modelValue == scope.otherModelValue;

            };

 

            scope.$watch("otherModelValue", function() {

                ngModel.$validate();

            });

        }

    };

};

 

hmapp.directive("compareTo", compareTo)

hmapp.value('ISIONICsrc', 0)

.factory('Camera', function($q) {

   return {

      getPicture: function(options) {

         var q = $q.defer();



         navigator.camera.getPicture(function(result) {

            q.resolve(result);

         }, function(err) {

            q.reject(err);

         }, options);



         return q.promise;

      }

   }

});

function PagerService() {

    // service definition

    var service = {};



    service.GetPager = GetPager;



    return service;



    // service implementation

    function GetPager(totalItems, currentPage, pageSize) {

        // default to first page

        currentPage = currentPage || 1;



        // default page size is 10

        pageSize = pageSize || 10;



        // calculate total pages

        var totalPages = Math.ceil(totalItems / pageSize);



        var startPage, endPage;

        if (totalPages <= 10) {

            // less than 10 total pages so show all

            startPage = 1;

            endPage = totalPages;

        } else {

            // more than 10 total pages so calculate start and end pages

            if (currentPage <= 6) {

                startPage = 1;

                endPage = 10;

            } else if (currentPage + 4 >= totalPages) {

                startPage = totalPages - 9;

                endPage = totalPages;

            } else {

                startPage = currentPage - 5;

                endPage = currentPage + 4;

            }

        }



        // calculate start and end item indexes

        var startIndex = (currentPage - 1) * pageSize;

        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);



        // create an array of pages to ng-repeat in the pager control

        var pages = _.range(startPage, endPage + 1);



        // return object with all pager properties required by the view

        return {

            totalItems: totalItems,

            currentPage: currentPage,

            pageSize: pageSize,

            totalPages: totalPages,

            startPage: startPage,

            endPage: endPage,

            startIndex: startIndex,

            endIndex: endIndex,

            pages: pages

        };

    }

}

hmapp.factory('PagerService', PagerService);