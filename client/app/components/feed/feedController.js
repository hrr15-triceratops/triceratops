angular.module('app.feed', ['feed.factory'])
  .controller('feedController', ['feedFactory', function(feedFactory) {
    // Hold onto context
    var self = this;

    // List of projects
    this.projects = [];

    // Grab the projects from the server
    feedFactory.getProjects()
      .then(function(projects) {
        self.projects = projects.data;
        console.log(self.projects);
      });

    // function to handle positive rep
    this.rep = function() {
      var data = {
        projId: self.projects[0]._id,
        rep: true,
        userId: 0 // TODO: REPLACE THIS W/ USERID
      };
      
      feedFactory.repProject(data)
        .then(function(project) {
          console.log(project.data); // Test so we can check the rep
          self.projects.shift(); // Shift off the first project so we can move to next
        });
    };

    // function that handles negative rep
    this.deRep = function() {
      var data = {
        projId: self.projects[0]._id,
        rep: false,
        userId: 0 // TODO: REPLACE THIS W/ USERID
      };
      
      feedFactory.repProject(data)
        .then(function(project) {
          console.log(project.data); // Test so we can check the rep
          self.projects.shift(); // Shift off the first project so we can move to next
        });
    };

    // function that adds a contributor
    this.addContrib = function() {
      var data = {
        projId: self.projects[0]._id,
        userId: 0 // TODO: CHANGE THIS TO THE CORRECT USERID
      };

      feedFactory.addContrib(data)
        .then(function(project) {
          console.log(project.data); // Log the data so we can see that it worked.
        });
    };

  }]);
