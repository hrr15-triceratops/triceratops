angular.module('app.signIn', ['signIn.factory', 'ngCookies'])
  .controller('signInController', ['signInFactory', '$cookies', '$location', function(signInFactory, $cookies, $location) {

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

          // Redirect user to the feed
          $location.path('#/feed');
        });
    };
  }]);