const mongoose = require('mongoose');
const {Cardschema} = require('./card');

const schema = new mongoose.Schema({
    start_time: {
      type: Date,
      required: true
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'players',
      required: true
    },
    status:{type:String},
    cards: [Cardschema]
});

const Game = mongoose.model('games', schema);

module.exports = Game;
