var express = require('express');
var app = express();
var Project = require('./db/projectSchema');
var utils = require('./utils/requestHandler');
//Database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/triceratops');

//Authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/userSchema');

// Creates the authentication strategy for passport
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, { message: 'Incorrect username, hombre' });
      }
      if(!user.validPassword(password)) {
        return done(null, false, { message: 'Wrong password, hombre' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      return done(err);
    }
    done(null, user);
  });
});

//Middleware -- FUNnel that dresses requests in costumes 
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.json());
//Authentication Middleware
app.use(passport.initialize());

//Do specific things for specific requests
//Do them in utilities
app.post('/login', passport.authenticate('local'), utils.auth);
app.post('/create', utils.create);
app.put('/contrib', utils.contrib);
app.put('/rep', utils.rep);
app.get('/projects', utils.projects);
app.post('/signup', utils.signup);

//Get server going
app.listen(process.env.PORT || 3000);

