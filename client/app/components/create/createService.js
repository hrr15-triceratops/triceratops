angular.module('create.factory', [])
  .factory('createFactory', function($http) {
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