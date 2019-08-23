const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sin: {
    type: String,
    required: true
  },
  deed: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  file: {
    type: String
  }
});

module.exports = User = mongoose.model('User', UserSchema);