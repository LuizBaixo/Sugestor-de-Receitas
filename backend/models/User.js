const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  ingredients: [String],
  favorites: [Object]
});

module.exports = mongoose.model('User', UserSchema);
