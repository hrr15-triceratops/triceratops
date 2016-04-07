var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: String, required: false },
  owner: { type: String, required: false },
  contributors: { type: Array, required: false }, 
  images: { type: Array, required: false }, 
  reputation: { type: Number, required: true, default: 0 }
}, { timestamps: true });

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
