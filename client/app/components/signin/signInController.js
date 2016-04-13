angular.module('app.signIn', ['signIn.factory', 'ngCookies'])
  .controller('signInController', ['signInFactory', '$cookies', function(signInFactory, $cookies) {

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
          $cookies.put('id', user.data._id);
          $cookies.put('email', user.data.email);
        });
    };
  }]);