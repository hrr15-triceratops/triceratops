angular.module('signIn.factory', [])
  .factory('signInFactory', function($http) {

    var login = function(data) {
      return $http({
        method: 'POST',
        url: '/login',
        data: data
      });
    };

    return {
      login: login
    };
  });