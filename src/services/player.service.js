const Player = require('../models/player');

exports.createPlayer = async (playerName) => {

    let player = await Player.findOne({ "name": playerName }).exec();

    if (!player) {
        player = new Player({
            name: playerName
        });
        await player.save();
    }
    return player;
};

exports.createDealer = async () => {

    let dealer = await Player.findOne({ "name": "dealer" }).exec();

    if (!dealer) {
        dealer = new Player({
            name: "dealer"
        });
        await dealer.save();
    }
    return dealer;
};