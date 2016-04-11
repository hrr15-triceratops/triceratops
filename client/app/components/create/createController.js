angular.module('app.create', ['create.factory'])
  .controller('createController', ['createFactory', function(createFactory) {
    // This calls the factory function that will send a request to the server
    // to create a project.
    this.createProject = function() {
      // Data grabbed from the form elements on the page.
      var data = {
        title: this.title,
        description: this.description,
        location: this.location,
        owner: this.owner,
        contributors: this.contribs.split('\n'),
        images: this.images.split('\n')
      };
      
      // Call factory function
      createFactory.createProject(data);
    };
  }]);
