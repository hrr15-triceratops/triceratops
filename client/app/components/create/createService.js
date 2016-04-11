angular.module('create.factory', [])
  .factory('createFactory', function($http) {
    // Factory function to create projects
    // Data is passed in from controller
    var createProject = function(data) {
      return $http({
        method: 'POST',
        url: '/create',
        data: data
      });
    };

    return {
      createProject: createProject
    };
  });