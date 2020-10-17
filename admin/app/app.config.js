var hmapp = angular.module('app', 
    ['ui.router', 'ui.bootstrap', 'ui.tinymce', 'ckeditor'])
//.value('APIURL', 'http://localhost/Boopathi/howmatch/admin/api/?action=');
.value('APIURL', 'https://facilejobs.com/admin/api/?action=');
hmapp
.config(routes);

function routes($stateProvider, $urlRouterProvider) {

    // default route
    $urlRouterProvider
        .when('', '/login');
    var states = [
        {
            name: 'login',
            label: 'Login',
            auth: false,
            restricted:false,
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'loginController'
        },
        {
            name: 'forgotPwd',
            label: 'Forgot Password',
            auth: false,
            restricted:false,
            url: '/forgot-password/',
            templateUrl: 'app/login/login.html',
            controller: 'loginController'
        },
        {
            name: 'dashboard',
            label: 'Home',
            auth: true,
            restricted:false,
            url: '/home',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'dashboardController'
        },
        {
            name: 'jobs',
            label: 'Job',
            auth: true,
            restricted:false,
            url: '/jobs',
            templateUrl: 'app/jobs/jobs.html',
            controller: 'jobsController'
        },
        {

            name: 'category',
            label: 'Category',
            auth: true,
            restricted:false,
            url: '/category',
            templateUrl: 'app/category/category.html',
            controller: 'categoryController'
          },
          
          {
            name: 'package',
            label: 'Package',
            auth: true,
            restricted:false,
            url: '/package',
            templateUrl: 'app/package/package.html',
            controller: 'packageController'
        },

         {
            name: 'skills',
            label: 'Skills',
            auth: true,
            restricted:false,
            url: '/skills',
            templateUrl: 'app/skills/skills.html',
            controller: 'skillsController'
        },
         {
            name: 'users',
            label: 'Users',
            auth: true,
            restricted:false,
            url: '/users',
            templateUrl: 'app/users/users.html',
            controller: 'usersController'
        },
        {
            name: 'company',
            label: 'Company',
            auth: true,
            restricted:false,
            url: '/company',
            templateUrl: 'app/company/company.html',
            controller: 'companyController'
        },
        {
            name: 'settings',
            label: 'Settings',
            auth: true,
            restricted:false,
            url: '/settings',
            templateUrl: 'app/settings/settings.html',
            controller: 'settingsController'
        },
        {
            name: 'education',
            label: 'Education Level',
            auth: true,
            restricted:false,
            url: '/education',
            templateUrl: 'app/education/education.html',
            controller: 'educationController'
        },
        {
            name: 'joblevel',
            label: 'Job Level',
            auth: true,
            restricted:false,
            url: '/joblevel',
            templateUrl: 'app/joblevel/joblevel.html',
            controller: 'joblevelController'
        },
        {
            name: 'industry',
            label: 'Industry',
            auth: true,
            restricted:false,
            url: '/industry',
            templateUrl: 'app/industry/industry.html',
            controller: 'industryController'
        },
        {
            name: 'benefits',
            label: 'Benefits',
            auth: true,
            restricted:false,
            url: '/benefits',
            templateUrl: 'app/benefits/benefits.html',
            controller: 'benefitsController'
        },
        {
            name: 'location',
            label: 'Location',
            auth: true,
            restricted:false,
            url: '/location',
            templateUrl: 'app/location/location.html',
            controller: 'locationController'
        },
        {
            name: 'keywords',
            label: 'keywords',
            auth: true,
            restricted:false,
            url: '/keywords',
            templateUrl: 'app/keywords/keywords.html',
            controller: 'keywordsController'
        },
        {
            name: 'language',
            label: 'Language',
            auth: true,
            restricted:false,
            url: '/language',
            templateUrl: 'app/language/language.html',
            controller: 'languageController'
        },
        {
            name: 'designation',
            label: 'Designation',
            auth: true,
            restricted:false,
            url: '/designation',
            templateUrl: 'app/designation/designation.html',
            controller: 'designationController'
        },
        {
            name: 'pages',
            label: 'Pages',
            auth: true,
            restricted:false,
            url: '/pages',
            templateUrl: 'app/pages/pages.html',
            controller: 'pagesController'
        },
        {
            name: 'contact_request',
            label: 'Contact Request',
            auth: true,
            restricted:false,
            url: '/contact_request',
            templateUrl: 'app/contact_request/contact_request.html',
            controller: 'contact_requestController'
        }
    ]

    angular.forEach(states, function (state) {
        $stateProvider.state(state);
    });
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

hmapp.directive("datePicker", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            $(element).datepicker({'format': 'yyyy-mm-dd', startDate: new Date()});
            
            $(element).on('changeDate', function(ev){
                $(this).datepicker('hide');
            });
        }
    };
});

hmapp.directive("select2multiple", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            $(element).select2();
        }
    };
});

hmapp.directive("carousel", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            $(element).carousel();
        }
    };
});

hmapp.directive("cdatePicker", function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            $(element).datepicker({'format': 'yyyy-mm-dd'});
            
            $(element).on('changeDate', function(ev){
                $(this).datepicker('hide');
            });
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
    require: '?ngModel',
    link: function (scope, element, attrs, ngModel) {
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
hmapp.value('ISIONICAPP', 0)
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

function PagingController($scope) {
  	
  	$scope.pager = {};
  	$scope.pagingSize = $scope.pagingSize || 10;
  	$scope.itemPerPage = $scope.itemPerPage || 10;
  	
  	function setPager (itemCount, currentPage, itemPerPage) {
  		currentPage = currentPage || 1;
  		var startPage, endPage;

  		var totalPages = Math.ceil(itemCount / itemPerPage);		
  		if (totalPages <= $scope.pagingSize) {
      	startPage = 1;
      	endPage = totalPages;
      } else {
      	if (currentPage + 1 >= totalPages) {
      		startPage = totalPages - ($scope.pagingSize - 1);
      		endPage = totalPages;
      	} else {
      		startPage = currentPage - parseInt($scope.pagingSize/2);
      		startPage = startPage <= 0 ? 1 : startPage;
      		endPage = (startPage + $scope.pagingSize - 1) <= totalPages ? (startPage + $scope.pagingSize - 1) : totalPages;
      		if(totalPages === endPage) {
      		  startPage = endPage - $scope.pagingSize + 1;
      		}
      	}
      }
  
  		var startIndex = (currentPage - 1) * itemPerPage;
  		var endIndex = startIndex + itemPerPage - 1;
  
      var index = startPage;
  		var pages = [];
  		for(; index < endPage + 1; index++)
  		  pages.push(index);
  		  
  		$scope.pager.currentPage = currentPage;
  		$scope.pager.totalPages = totalPages;
  		$scope.pager.startPage = startPage;
  		$scope.pager.endPage = endPage;
  		$scope.pager.startIndex = startIndex;
  		$scope.pager.endIndex = endIndex;
  		$scope.pager.pages = pages;
  	}
  	
  	$scope.setPage = function(currentPage) {
  		if (currentPage < 1 || currentPage > $scope.pager.totalPages)
  			return;
  
  		setPager($scope.totalItems.length, currentPage, $scope.itemPerPage);
  		$scope.displayItems = $scope.totalItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
  	};
  	
  	$scope.setPage(1);
}

hmapp.directive('pagingControl', [function(){
	return {
	  restrict: 'E',
	  templateUrl: 'app/elements/paging.html',
	  controller: ['$scope', PagingController],
	  scope: {
	    totalItems: "=",
	    displayItems: '=',
	    pagingSize: '=',
	    itemPerPage: '=noofitem'
	  }
	};
}]);