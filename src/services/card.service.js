const Game = require('../models/game');

/**
 * Draws a card from the deck of the specified game that has not been used.
 * @param {string} gameId - The ID of the game.
 * @returns {<Object>} - The card object that has not been used.
 */
exports.drawCardFromDeck = async (gameId) => {
  const card = await Game.findOne(
    { _id: gameId },
    { cards: { $elemMatch: { isUsed: false } } }
  ).lean();

  return card;
};