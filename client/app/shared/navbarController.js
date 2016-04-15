angular.module('app.navbar', [])
  .factory('navbarFactory', function($cookies, $location) {
    var email = $cookies.getAll().email;

    var updateEmail = function(newEmail) {
      email = email;
    };

    var getEmail = function() {
      return $cookies.get('email');
    };

    var signout = function() {
      $cookies.remove('email');
      $cookies.remove('id');
      $cookies.remove('name');

      $location.path('/signin');

      email = '';
    };

    return {
      updateEmail: updateEmail,
      getEmail: getEmail,
      signout: signout
    };
  })

  .controller('navbarController', [ '$scope', 'navbarFactory', function($scope, navbarFactory) {
    $scope.emailFn = navbarFactory.getEmail;

    $scope.signout = navbarFactory.signout;
  }]);