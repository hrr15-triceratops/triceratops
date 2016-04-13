angular.module('signUp.factory', [])
  .factory('signUpFactory', function($http) {
    // Factory function to signUp Users
    // Data is passed in from controller
    var signUpUser = function(data) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: data
      });
    };

    return {
      signUpUser: signUpUser
    };
  });