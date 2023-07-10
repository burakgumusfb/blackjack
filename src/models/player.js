const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    delay: { type: Number }
});

const Player = mongoose.model('players', schema)
module.exports = Player;