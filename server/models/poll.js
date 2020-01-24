const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  options: String,
  votes: {
    type: Number,
    default: 0
  }
});

const pollSchema = new mongoose.Schema({
  // Which user submitted the poll 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  question: String,
  options: [optionSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  created: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = mongoose.model('Poll', pollSchema);