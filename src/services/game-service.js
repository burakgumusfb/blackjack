const Game = require('../models/game');
const Player = require('../models/player');
const Hand = require('../models/hand');
const { status } = require('../constants/constants');

/**
 * Creates a new game with the specified player and cards.
 * @param {string} playerId - The ID of the player.
 * @param {Array} cards - The array of cards for the game.
 * @returns {<Object>} - The saved game object.
 */
exports.createNewGame = async (playerId, cards) => {
    const newGame = new Game({
        start_time: new Date(),
        player: playerId,
        status: status.PLAYING,
        cards
    });
    const savedGame = await newGame.save();
    return savedGame;
};

/**
 * Marks the specified cards as used in the game.
 * @param {string} gameId - The ID of the game.
 * @param {Array} cards - The array of cards to mark as used.
 * @returns {Promise<void>}
 */
exports.usedGameCards = async (gameId, cards) => {
    for (const card of cards) {
        await Game.updateOne(
            { _id: gameId, 'cards._id': card._id },
            { $set: { 'cards.$.isUsed': true } }
        ).exec();
    }
};

/**
 * Deletes the games and associated hands for the specified player.
 * @param {string} playerName - The name of the player.
 * @returns {Promise<void>}
 */
exports.DeleteBeforeGames = async (playerName) => {
    const player = await Player.findOne({ name: playerName }).lean();
    if (player) {
        const game = await Game.findOneAndDelete({ player: player._id }).exec();
        if (game) {
            await Hand.deleteMany({ game: game._id }).exec();
        }
    }
};

/**
 * Updates the status of the specified game.
 * @param {string} gameId - The ID of the game.
 * @param {string} gameStatus - The new status of the game.
 * @returns {Promise<void>}
 */
exports.updateGameStatus = async (gameId, gameStatus) => {
    await Game.updateOne(
        { _id: gameId },
        { $set: { status: gameStatus } }
    ).exec();
};

/**
 * Retrieves the active game for the specified player.
 * @param {string} playerName - The name of the player.
 * @returns {<Object>} - The active game object, or null if not found.
 */
exports.getActiveGame = async (playerName) => {
    const player = await Player.findOne({ name: playerName }).lean();
    if (player) {
        const game = await Game.findOne({ player: player._id, status: status.PLAYING }).lean();
        return game;
    }
};
