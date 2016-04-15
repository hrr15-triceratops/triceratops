angular.module('app.signIn', ['signIn.factory', 'ngCookies', 'app.navbar'])
  .controller('signInController', ['signInFactory', '$cookies', '$location', 'navbarFactory', function(signInFactory, $cookies, $location, navbarFactory) {

    this.signIn = function() {
      var data = {
        email: this.email,
        password: this.password
      };

      signInFactory
        .login(data)
        .then(function(user) {
          if(!user) {
            return console.log('Login failed');
          }
          // Set our information in the cookie
          $cookies.put('name', user.data.firstName);
          $cookies.put('id', user.data._id);
          $cookies.put('email', user.data.email);

          console.log(user.data.email);
          navbarFactory.updateEmail(user.data.email);
          // Redirect user to the feed
          $location.path('/feed');
        });
    };
  }]);