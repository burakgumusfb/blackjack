const { Card } = require('../models/card');
const Hand = require('../models/hand');
const { scores } = require('../constants/constants');

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

exports.calculateHandValue = async (gameId, playerId, isDealer = false) => {
    let usedCards = await Hand.find({ "game": gameId, "player": playerId }).select('card -_id').lean();
    if (!usedCards)
        throw new Error("Used cards couldn't find.");

    let cards = await Card.find({ "_id": { $in: usedCards.map(l => l.card) } }).lean();
    if (!cards)
        throw new Error("Cards couldn't find.");

    let totalValue = cards.reduce((sum, obj) => {
        return sum + obj.value.reduce((valSum, val) => valSum + val, 0);
    }, 0);


    let aceCount = 0;
    let adjustedValue = totalValue;

    aceCount = cards.filter(x => x.isAce == true).length;


    while (aceCount > 1 && adjustedValue > scores.BLACKJACK_SCORE) {
        adjustedValue -= 12;
        aceCount--;
    }

    if (aceCount >= 1 && adjustedValue > scores.BLACKJACK_SCORE) {
        adjustedValue -= 1;
        aceCount--;
    }

    if(isDealer && aceCount == 1 && adjustedValue < scores.THRESHOLD)
    {
      
        var decision = Math.round(Math.random());
        if(decision == 0)
         adjustedValue -= 10;
        else
        adjustedValue -= 1;
    }

    return adjustedValue;
};