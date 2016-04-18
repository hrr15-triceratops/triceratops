angular.module('app.signIn', ['signIn.factory', 'ngCookies', 'app.navbar'])
  .controller('signInController', ['signInFactory', '$cookies', '$location', 'navbarFactory', function(signInFactory, $cookies, $location, navbarFactory) {
    // Hold onto context
    var self = this;
    
    // Variable to hold failed logins
    this.failed = false;

    this.signIn = function() {
      var data = {
        email: this.email,
        password: this.password
      };

      signInFactory
        .login(data)
        .then(function(user) {
          // Set our information in the cookie
          $cookies.put('name', user.data.firstName);
          $cookies.put('id', user.data._id);
          $cookies.put('email', user.data.email);

          // Update the email on the screen
          navbarFactory.updateEmail(user.data.email);

          // Redirect user to the feed
          $location.path('/feed');
        })
        .catch(function() {
          // Catch invalid login attempts and display message on page
          self.failed = true;

          self.email = '';
          self.password = '';
        });
    };
  }]);