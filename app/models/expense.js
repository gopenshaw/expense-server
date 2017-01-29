var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Expense', new Schema({
  date: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user: {
    type: String,
    required: true
  }
}));
