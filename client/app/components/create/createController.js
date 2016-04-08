angular.module('app.create', ['create.factory'])
  .controller('createController', ['createFactory', function(createFactory) {
    this.createProject = function() {
      var data = {
        project_title: this.title,
        project_description: this.description,
        project_owner: this.owner,
        project_location: this.location,
        project_contribs: this.contribs.split('\n'),
        project_images: this.images.split('\n'),
        project_rep: 0
      };
      
      createFactory.createProject(data);
    };
  }]);
