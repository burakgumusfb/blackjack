const { Card } = require('../models/card');
const Game = require('../models/game');
const Hand = require('../models/hand');
const Player = require('../models/player');

const {createPlayer,createDealer} = require('./player.service');
const {createNewGame} = require('./game.service');

function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5);
}
async function createHand(gameId, playerId, cards) {

    let hands = [];
    cards.forEach(card => {
        let newHand = new Hand({
            game: gameId,
            player: playerId,
            card: card._id,
            date_time:new Date()
        });
        hands.push(newHand);
    });

    await Hand.insertMany(hands);
}

exports.newGame = async (playerName, delay) => {

    await Game.deleteMany({}).exec();
    await Hand.deleteMany({}).exec();

    const dealer = await createDealer();
    const player = await createPlayer(playerName);

    const cards = await Card.find().lean().exec();
    const shuffledCards = shuffleCards(cards);
    const savedGame = await createNewGame(shuffledCards);

    const playerCards = shuffledCards.splice(0, 2);
    const dealerCards = shuffledCards.splice(0, 2);

    await createHand(savedGame._id, player._id, playerCards);
    await createHand(savedGame._id, dealer._id, dealerCards);


    const response = {
        gameId: savedGame._id,
        dealerCards: dealerCards,
        playerCards: playerCards
    }
    return response;
};

