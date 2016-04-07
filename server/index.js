var express = require('express');
var app = express();

//Database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/triceratops');

//Middleware -- FUNnel that dresses requests in costumes 
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.json());

//Do specific things for specific requests
//Do them in utilities

//Get server going
app.listen(process.env.PORT || 3000);