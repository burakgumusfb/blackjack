const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games',
        required: true
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players',
        required: true
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cards',
        required: true
    },
    date_time: {
        type: Date,
        required: true
    },
    result: {type: String}
});

const Hand = mongoose.model('hands', schema);
module.exports = Hand;