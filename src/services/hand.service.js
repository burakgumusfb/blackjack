const mongoose = require('mongoose');
const { Card, Cardschema } = require('../models/card');
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

exports.calculateHandValue = async (gameId, playerId) => {
    let usedCards = await Hand.find({ "game": gameId, "player": playerId }).select('card -_id').lean();
    if (!usedCards)
        throw new Error("Used cards couldn't find.");

    let cards = await Card.find({ "_id": { $in: usedCards.map(l => l.card) } }).lean();
    if (!cards)
        throw new Error("Cards couldn't find.");

    let totalValue = cards.reduce((sum, obj) => {
        return sum + obj.value.reduce((valSum, val) => valSum + val, 0);
    }, 0);


    // As (Ace) sayısını ve toplam değeri tutacak değişkenler
    let aceCount = 0;
    let adjustedValue = totalValue;

    // As (Ace) sayısını ve toplam değeri kontrol et
    cards.forEach((card) => {
        if (card.isAce) {
            aceCount++;
        }
    });

    // Eğer 2 veya daha fazla As (Ace) varsa ve toplam değer 21'i geçiyorsa, As (Ace) değerlerini 1 olarak ayarla
    while (aceCount > 1 && adjustedValue > 21) {
        adjustedValue -= 10;
        aceCount--;
    }

    while (aceCount >= 1 && adjustedValue > 21) {
        adjustedValue -= 1;
    }

    return adjustedValue;
};