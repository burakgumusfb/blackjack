const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    start_time: {
      type: Date,
      required: true
    },
    end_time: {
      type: Date,
      required: true
    }
});

const Game = mongoose.model('Game', schema);

module.exports = Game;
