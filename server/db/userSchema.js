var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  password: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: false },
  projects: { type: Array, required: false }
}, { timestamps: true });

userSchema.methods.validPassword = function(password) {
  if (this.password === password) {
    return true;
  }
  return false;
};

var User = mongoose.model('User', userSchema);

module.exports = User;