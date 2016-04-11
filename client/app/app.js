// TODO: Move this to /libs/js ? it is not angular related
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
  'app.create',
  'app.feed'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    // Route users to /feed if they visit a link that doesn't have a route.
    $urlRouterProvider.otherwise('/feed');

    $stateProvider
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/components/feed/feedView.html',
        controller: 'feedController',
        controllerAs: 'feed'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/components/create/createView.html',
        controller: 'createController',
        controllerAs: 'create'
      })
  });