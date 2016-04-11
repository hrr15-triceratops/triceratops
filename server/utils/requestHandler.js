var db = require('../index.js');

//Require our User and Project objects. 
var Project = require('../db/projectSchema');
var User = require('../db/userSchema');

//Helper function that adds a new Project to the DB
exports.create = function(req, res) {
  //this is a JSON object ready for sending to the DB
  var projectData = req.body;
  // Check if project title already exists in the DB
  Project.findOne({ title: projectData.title, location: projectData.location }, function(err, found) {
    if(err) {
      res.send(err);
    } else if(found) {
      //send a response that the project title is already taken
      //TODO: Consider if we want to suggest that the project already exists... maybe send back the project we found
      res.send(found); //TODO: Maybe augment the found object to indicate that it's a duplicate
    } else {
      // create a new project entry in the DB
      var project = new Project(projectData);
      // Save it in the DB
      project.save(function(err, project) {
        if(err) {
          res.send(err);
        } else {
        //return the project to the client for rendering
        res.send(project);
        };
      });
    };
  });
};

//Helper function that adds a new Project to the DB
exports.projects = function(req, res) {
  // Potentially send data about the users geoInfo
  // var reqData = req.body;

  // Retrieve all the Projects in the DB
  Project.find(function(err, projects) {
    if (err) {
      res.send(err);
    } else {
      // Send array with all project objects
      res.send(projects);  
    };
  });
};

exports.contrib = function(req, res) {};
exports.rep = function(req, res) {};

