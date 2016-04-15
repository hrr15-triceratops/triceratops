angular.module('app.feed', ['feed.factory', 'ngCookies', 'app.navbar'])
  .controller('feedController', ['feedFactory', '$cookies', function(feedFactory, $cookies) {
    // Hold onto context
    var self = this;

    // Grab variables from cookies
    var uid = $cookies.getAll().id;
    var name = $cookies.getAll().name;

    // List of projects & our current user
    this.projects = [];
    this.user = {};

    // Object containing the ids of the users projects
    var userProjects = {};

    // Grab the current logged in user from the db so we can access their array of projects
    feedFactory.getUser(uid)
      .then(function(user) {
        self.user = user.data;

        // Build an object out of the user projects
        self.user.projects.forEach(function(project) {
          if (! (project.id in userProjects)) {
            userProjects[project.id] = true;
          }
        });
      });

    // Make an object out of their contributions


    // Grab the projects from the server
    feedFactory.getProjects()
      .then(function(projects) {
        self.projects = projects.data.filter(function(project) {
          // Only return the projects that the user hasn't contributed to
          return (!(project._id in userProjects));
        });
      });

    // function to handle positive rep
    this.rep = function() {
      var data = {
        projId: self.projects[0]._id,
        rep: true,
        userId: uid 
      };
      
      feedFactory.repProject(data)
        .then(function(project) {
          self.projects.shift(); // Shift off the first project so we can move to next
        });
    };

    // function that handles negative rep
    this.deRep = function() {
      var data = {
        projId: self.projects[0]._id,
        rep: false,
        userId: uid 
      };
      
      feedFactory.repProject(data)
        .then(function(project) {
          self.projects.shift(); // Shift off the first project so we can move to next
        });
    };

    // function that adds a contributor
    this.addContrib = function() {
      var data = {
        projId: self.projects[0]._id,
        userId: uid,
        name: name
      };

      feedFactory.addContrib(data)
        .then(function(project) {
          self.projects.shift();
        });
    };

  }]);
