// TODO: Move this to /libs/js ? it is not angular related
$('body').on('error', 'img', function() {
  console.log('ERROR!');
});

$(function() {
  // Initiate Bootstrap Material Theme
  $.material.init();

  // Handle active links
  $('.nav a').on('click', function() {
    $('.nav').find('.active').removeClass('active');
    $(this).parent().addClass('active');
  });

});

/* Main Angular application */
angular.module('app', [
  'ui.router',
  'ngCookies',
  'app.create',
  'app.feed',
  'ngAutocomplete',
  'app.signIn',
  'app.signUp'

  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    // Route users to /feed if they visit a link that doesn't have a route.
    $urlRouterProvider.otherwise('/feed');

    $stateProvider
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/components/feed/feedView.html',
        controller: 'feedController',
        controllerAs: 'feed',
        auth: true
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/components/create/createView.html',
        controller: 'createController',
        controllerAs: 'create',
        auth: true
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/components/signup/signUpView.html',
        controller: 'signUpController',
        controllerAs: 'signUp',
        auth: false
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/components/signin/signInView.html',
        controller: 'signInController',
        controllerAs: 'signIn',
        auth: false
      });
  })

  // Check to see if the user is authenticated
  .run(function($rootScope, $state, $cookies) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var auth = toState.auth;
      var email = $cookies.getAll().email;

      if (auth && !email) {
        event.preventDefault();
        $state.go('signin');
      }
    });

  })

  .directive('errSrc', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          if (attrs.src !== attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    };
  });