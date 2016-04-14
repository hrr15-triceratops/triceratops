angular.module('app.dashboard', ['dashboard.factory'])
  .controller('dashboardController', ['dashboardFactory', '$cookies', function(dashboardFactory, $cookies) {
    // Hold onto context
    var self = this;

    // Grab current userId from cookies
    var uid = $cookies.getAll().id;

    // List of projects & our current user
    this.projectIds = {};
    this.projects = [];
    this.user = {};

    // Grab the current logged in user from the db so we can access their array of projects
    dashboardFactory.getUser(uid)
      .then(function(user) {
        console.log(user);
        self.user = user.data;

        // Build an object out of the user contrib projects
        self.user.projects.forEach(function(project) {
          if(project.contrib) {
            self.projectIds[project.id] = true;
          };
        });
        console.log(self.projectIds);
      });
    // Grab the projects from the server
    dashboardFactory.getProjects()
      .then(function(projects) {
        self.projects = projects.data.filter(function(project) {
          // Only return the projects that the user contributes to
          return (project._id in self.projectIds);
        });
      });
  }]);