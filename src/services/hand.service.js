const Hand = require('../models/hand');

exports.createHand = async (gameId, playerId, cards) => {

    let hands = [];
    cards.forEach(card => {
        let newHand = new Hand({
            game: gameId,
            player: playerId,
            card: card._id,
            date_time: new Date()
        });
        hands.push(newHand);
    });

    await Hand.insertMany(hands);
};
