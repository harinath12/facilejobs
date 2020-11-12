(function () {
    'use strict'

    angular.module('app')
        .factory('httpService', httpRestService);

    httpRestService.$inject = ['$http', '$q'];

    function httpRestService($http, $q) {

        return {
            get: get,
            post: post
        }

        function get(url) {
            return $http.get(url);
        }

        function post(url, req) {
            var deferred = $q.defer(),
                apiPromise;

            apiPromise = $http.post(url, req, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});

            apiPromise.then(function(response){
                deferred.resolve(response);
            }, function(response){
                deferred.reject(response);
            });

            return deferred.promise;

        }

    }

    angular.module('app').factory('facebookService', function($q) {
        return {
            getMyLastName: function() {
                var deferred = $q.defer();
                FB.api('/me', {
                    fields: 'last_name'
                }, function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise;
            }
        }
    });

})();