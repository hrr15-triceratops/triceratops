var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  location: { type: String, required: false },
  projects: { type: Array, required: false }
}, { timestamps: true });

var User = mongoose.model('User', userSchema);

module.exports = User;