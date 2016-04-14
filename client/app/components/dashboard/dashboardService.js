angular.module('dashboard.factory', ['feed.factory'])
  .factory('dashboardFactory', function($http, feedFactory) {
    var getUser = feedFactory.getUser;
    var getProjects = feedFactory.getProjects;

    return {
      getUser: getUser,
      getProjects: getProjects
    };
  });