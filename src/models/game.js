const mongoose = require('mongoose');
const {Cardschema} = require('./card');

const schema = new mongoose.Schema({
    start_time: {
      type: Date,
      required: true
    },
    end_time: { type: Date},
    cards: [Cardschema]
});

const Game = mongoose.model('games', schema);

module.exports = Game;
