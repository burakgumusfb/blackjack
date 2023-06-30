const Game = require('../models/game');

exports.createNewGame = async (cards) => {

    const newGame = new Game({
        start_time: new Date(),
        cards: cards
    });
    const savedGame = await newGame.save();
    return savedGame;
};