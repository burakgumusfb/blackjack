const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    start_time: {
      type: Date,
      required: true
    },
    end_time: { type: Date,}
});

const Game = mongoose.model('games', schema);

module.exports = Game;
