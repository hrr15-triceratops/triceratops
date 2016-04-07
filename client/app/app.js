angular.module('app', [
  'ui.router'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/feed');

    $stateProvider
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/components/feed/feedView.html',
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/components/create/createView.html'
      })
  });