var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
}));
