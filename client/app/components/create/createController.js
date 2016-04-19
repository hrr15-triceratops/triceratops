angular.module('app.create', ['create.factory'])
  .controller('createController', ['createFactory', '$location', function(createFactory, $location) {
    // This calls the factory function that will send a request to the server
    // to create a project.
    var self = this;

    // Gets all the users for rendering the dropdown users
    createFactory.getUsers().then(function(users) {
      var temp = [];
      users.data.forEach(function(user) {
        temp.push(user);
      });
      self.users = temp;
    });

    // This stores all the selected contributors
    self.contributors = [];



    this.createProject = function() {
      // Data grabbed from the form elements on the page.

      // This little hack simply stores the first names of the users objects. 
      var contribs = self.contributors.map(function(user) {
        return user.firstName;
      });

      //Creates the data object to send in the createFactory
      var data = {
        title: this.title,
        description: this.description,
        location: this.location,
        owner: this.owner,
        contributors: contribs,
        images: this.images.split('\n')
      };
      
      // Call factory function
      createFactory.createProject(data)
        .then(function(project) {
          // Add an alert here for success?
          $location.path('#/feed');
        });
    };
  }]);
