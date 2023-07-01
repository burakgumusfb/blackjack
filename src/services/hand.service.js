const { Card } = require('../models/card');
const Hand = require('../models/hand');
const { scores } = require('../constants/constants');

/**
 * Creates a new hand for the specified game and player with the given cards.
 * @param {string} gameId - The ID of the game.
 * @param {string} playerId - The ID of the player.
 * @param {Array} cards - The array of cards for the hand.
 * @returns {Promise<void>}
 */
exports.createHand = async (gameId, playerId, cards) => {
    const hands = cards.map((card) => {
        return new Hand({
            game: gameId,
            player: playerId,
            card: card._id,
            date_time: new Date()
        });
    });

    await Hand.insertMany(hands);
};

/**
 * Calculates the total value of the specified player's hand in the game.
 * @param {string} gameId - The ID of the game.
 * @param {string} playerId - The ID of the player.
 * @param {boolean} isDealer - Indicates if the player is the dealer. Default is false.
 * @returns {Promise<number>} - The calculated hand value.
 * @throws {Error} - If the used cards or cards are not found.
 */
exports.calculateHandValue = async (gameId, playerId, isDealer = false) => {
    const usedCards = await Hand.find({ game: gameId, player: playerId }).select('card -_id').lean();
    if (!usedCards) {
        throw new Error("Used cards were not found.");
    }

    const cardIds = usedCards.map((l) => l.card);
    const cards = await Card.find({ _id: { $in: cardIds } }).lean();
    if (!cards) {
        throw new Error("Cards were not found.");
    }

    let totalValue = cards.reduce((sum, obj) => {
        return sum + obj.value.reduce((valSum, val) => valSum + val, 0);
    }, 0);

    let aceCount = cards.filter((x) => x.isAce === true).length;
    let adjustedValue = totalValue;

    while (aceCount > 1 && adjustedValue > scores.BLACKJACK_SCORE) {
        adjustedValue -= 12;
        aceCount--;
    }

    if (aceCount >= 1 && adjustedValue > scores.BLACKJACK_SCORE) {
        adjustedValue -= 1;
        aceCount--;
    }

    if (isDealer && aceCount === 1 && adjustedValue < scores.THRESHOLD) {
        const decision = Math.round(Math.random());
        if (decision === 0) {
            adjustedValue -= 10;
        } else {
            adjustedValue -= 1;
        }
    }

    return adjustedValue;
};

/**
 * Retrieves the cards of the specified player's hand in the game.
 * @param {string} playerId - The ID of the player.
 * @param {string} gameId - The ID of the game.
 * @returns {Promise<Array>} - The array of cards in the player's hand.
 */
exports.getHand = async (playerId, gameId) => {
    const cards = await Hand.find({ player: playerId, game: gameId }).populate('card').select('card -_id').lean();
    return cards;
}