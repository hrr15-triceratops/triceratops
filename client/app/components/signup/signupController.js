angular.module('app.signUp', ['signUp.factory'])
  .controller('signUpController', ['signUpFactory', function(signUpFactory) {
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
      signUpFactory.signUpUser(data);
    };
  }]);