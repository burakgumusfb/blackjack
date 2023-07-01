const { Card } = require('../models/card');
const Hand = require('../models/hand');
const { scores } = require('../constants/constants');

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
