const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    result: {
        type: String, required: true
    }
});

const Hand = mongoose.model('Hand', schema);
module.exports = Hand;