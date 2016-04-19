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

    var getUsers = function() {
      return $http({
        method: 'GET',
        url: '/users'
      });
    };

    return {
      createProject: createProject,
      getUsers: getUsers
    };
  });