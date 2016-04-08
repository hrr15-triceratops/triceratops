angular.module('app.create', ['create.factory'])
  .controller('createController', ['createFactory', function(createFactory) {
    this.createProject = function() {
      var data = {
        title: this.title,
        description: this.description,
        location: this.location,
        owner: this.owner,
        contributors: this.contribs.split('\n'),
        images: this.images.split('\n')
      };
      
      createFactory.createProject(data);
    };
  }]);
