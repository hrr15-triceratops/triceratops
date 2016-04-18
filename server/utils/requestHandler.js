var db = require('../index.js');

//Require our User and Project objects. 
var Project = require('../db/projectSchema');
var User = require('../db/userSchema');
var passport = require('passport');

exports.auth = function(req, res, next) {
  var info = req.info;
  var user = req.user;
  console.log(req);
  if(info) {
    res.send(info);
  }
  res.send(user);
};

//Helper function that adds a new Project to the DB
exports.create = function(req, res) {
  //this is a JSON object ready for sending to the DB
  var projectData = req.body;
  console.log(projectData);

  // Check if project title already exists in the DB
  // Find the project in db
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

//Helper function that alters reputation for a project
exports.rep = function(req, res) {

  // Function to alter reputation on a project
  // User for both rep and contrib logic
  var updateContrib = function(req, res) {
    console.log(req.body);
    var projId = req.body.projId;
    var projRep = req.body.rep;
    var userId = req.body.userId;
    console.log(userId);

    // Find the project in db
    Project.findOne({ _id: projId }, function(err, project) {
      if(err) {
        res.send(err);
      } else {
        // Update the Reputation
        if(projRep) {
          // Add 1 to posRep
          project.posRep += 1;
          project.save(function(err) {
            console.log('Project saved');
          });
        } else {
          // Add 1 to negRep
          project.negRep += 1;
          project.save(function(err) {
            console.log('Project saved');
          });
        };
      };
    });
    // Find the user in the db
    User.findOne({ _id: userId }, function(err, user) {
      if(err) {
        res.send(err);
      } else {
          user.projects.push({ id: projId, contrib: false });
          user.save(function(err) {
            res.send(user); //TODO: Update to make more useful after refactor to utils
          });
      }
    });
  };

  // Call updateContrib
  updateContrib(req, res);
  
};

//Helper function that adds user as a contributor to a particular project
exports.contrib = function(req, res) {
  // req.body contains projectId, userId & name
  var projId = req.body.projId;
  var userId = req.body.userId;
  var name = req.body.name;

  // PROJECT UPDATES
  // Find the project in db
  Project.findOne({ _id: projId }, function(err, project) {
    if(err) {
      res.send(err);
    } else {
      // Add 1 to posRep
      project.posRep += 1;
      // Add name to contributors
      project.contributors.push(name);
      project.save(function(err) {
        console.log('Project saved!');
        // res.send(project);
      });
    }

  // USER UPDATES
  // Find the user in the db
  User.findOne({ _id: userId }, function(err, user) {
    if(err) {
      res.send(err);
    } else {
      // Add project to the users array
      var projects = user.projects;
      // Check if user projects contain projId
      projects.forEach(function(project) {
        // If so, change contrib --> true
        if(project._id === projId) {
          project.contrib = true;
          user.save(function(err) {
            res.send(user);
          });
        }
      });
      // else, add projectId to projects and set contrib to true
      user.projects.push({ id: projId, contrib: true });
      user.save(function(err) {
        res.send(user);
      });
    }
  });
  });
};

exports.signup = function(req, res) {
  var userEmail = req.body.email;
  var userData = req.body;

  // Find if email address is taken
  // Find User
  User.findOne({ email: userEmail }, function(err, user) {
    if(err) {
      res.send(err);
    } else if (user) {
      res.send({message: 'Email address already in use'});
    } else {
      var user = new User(userData);
      user.save(function(err) {
        if(err) {
          res.send(err);
        } else {
          res.send(user);
        };
      });
    };
  });
};

exports.users = function(req, res) {

  // Retrieve all the Users in the DB
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    } else {
      // Send array with all user objects
      res.send(users);  
    };
  });
};

exports.user = function(req, res) {
  var id = req.params.uid;

  User.findById(id, function(err, user) {
    if(err) {
      res.send(err);
    };
    res.send(user);
  });
};
