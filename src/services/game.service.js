const Game = require('../models/game');

exports.createNewGame = async (cards) => {

    const newGame = new Game({
        start_time: new Date(),
        cards: cards
    });
    const savedGame = await newGame.save();
    return savedGame;
};

exports.UsedGameCards = async (gameId, cards) => {

    cards.forEach(async card => {
        await Game.updateOne(
            { _id: gameId, 'cards._id': card._id },
            { $set: { 'cards.$.isUsed': true } },
        ).exec();
    });
};