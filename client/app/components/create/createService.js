angular.module('create.factory', [])
  .factory('createFactory', function($http) {
    var createProject = function(data) {
      return $http({
        method: 'POST',
        url: '/api/users',
        data: data
      });
    };

    return {
      createProject: createProject
    };
  });