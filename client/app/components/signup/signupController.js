angular.module('app.signUp', ['signUp.factory', 'ngCookies'])
  .controller('signUpController', ['signUpFactory', '$cookies', '$location', function(signUpFactory, $cookies, $location) {
    // This calls the factory function that will send a request to the server
    // to create a user.
    this.signUpUser = function() {
      // Data grabbed from the form elements on the page.
      var data = {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        email: this.email,
        location: this.location
      };
      
      // Call factory function
      signUpFactory.signUpUser(data)
        .then(function(user) {
          // Set our information in the cookie
          $cookies.put('name', user.data.firstName);
          $cookies.put('id', user.data._id);
          $cookies.put('email', user.data.email);

          // Redirect user to the feed
          $location.path('#/feed');
        });
    };
  }]);