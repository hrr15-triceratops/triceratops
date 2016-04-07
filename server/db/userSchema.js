var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: false }
}, { timestamps: true });

var User = mongoose.model('User', userSchema);

module.exports = User;