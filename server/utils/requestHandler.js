var db = require('../index.js');

//Require our User and Project objects. 
var Project = require('../db/projectSchema');
var User = require('../db/userSchema');

//Helper function that adds a new Project to the DB
var create = function(req, res) {
  //this is a JSON object ready for sending to the DB
  var projectData = req.body;
  // Check if project title already exists in the DB
  Project.find({ title: projectData.title, location: projectData.location }).then(function(found) {
    if(found) {
      //send a response that the project title is already taken
      //TODO: Consider if we want to suggest that the project already exists... maybe send back the project we found
      return res.status(403).send('Sorry, but the project name is already taken!');
    } 
    else {
      // create a new project entry in the DB
      var project = new Project(projectData);
      // Save it in the DB
      project.save(function(err, project) {
        if(err) return console.log(err);
        //return the project to the client for rendering
        res.send(project);
      });
    };
  });
};

module.exports = {
  create: create
}
