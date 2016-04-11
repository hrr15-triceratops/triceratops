angular.module('feed.factory', [])
  .factory('feedFactory', function($http) {

    // Send to request to get all projects from server
    var getProjects = function() {
      return $http({
        method:'GET',
        url: '/projects'
      });
    };

    // Put request to modify the project reputation
    var repProject = function(data) {
      return $http({
        method: 'PUT',
        url: '/rep',
        data: data
      });
    };

    return {
      getProjects: getProjects,
      repProject: repProject
    };
  });