const { Card } = require('../models/card');
const Game = require('../models/game');
const Hand = require('../models/hand');
const Player = require('../models/player');

const { createPlayer, createDealer, getPlayer, getDealer } = require('./player.service');
const { createNewGame, UsedGameCards, DeleteBeforeGames, getGame, getActiveGame, usedGameCards, updateGameStatus } = require('./game.service');
const { createHand, calculateHandValue } = require('./hand.service');
const { actions, scores, status } = require('../constants/constants');
const { drawCardFromDeck } = require('./card.service');

/**
 this method shuffles the cards.
 **/
function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

/**
this method creates a new game between player and the dealer.
**/
exports.newGame = async (playerName, delay) => {

    await DeleteBeforeGames(playerName);

    const dealer = await createDealer();
    const player = await createPlayer(playerName);

    const cards = await Card.find().lean().exec();
    const shuffledCards = shuffleCards(cards);
    const savedGame = await createNewGame(player._id, shuffledCards);

    let playerCards = shuffledCards.splice(0, 2);
    let dealerCards = shuffledCards.splice(0, 2);

    await createHand(savedGame._id, player._id, playerCards);
    await createHand(savedGame._id, dealer._id, dealerCards);

    const usedCards = playerCards.concat(dealerCards);
    await usedGameCards(savedGame._id, usedCards);

    const response = {
        gameId: savedGame._id,
        dealerCards: dealerCards,
        playerCards: playerCards
    }
    return response;
};

/**
 this method takes a card from desk.
 **/

exports.drawCard = async (playerName, action) => {

    const game = await getActiveGame(playerName);
    if (!game)
        throw new Error("The game couldn't find. Please create a new game.");

    const player = await getPlayer(playerName);
    let playerScore = await calculateHandValue(game._id, player._id);
    if (action == actions.HIT && playerScore < scores.BLACKJACK_SCORE) {

        const deckCard = await drawCardFromDeck(game._id);
        if (!deckCard)
            throw new Error("Card couldn't find on the deck.");

        await createHand(game._id, player._id, deckCard.cards);
        await usedGameCards(game._id, deckCard.cards);

        playerScore = await calculateHandValue(game._id, player._id);

        if (playerScore > scores.BLACKJACK_SCORE) {
            game.status = status.BUST;
        }
    }

    if (game.status == status.PLAYING) {
        const dealer = await getDealer();
        let dealerScore = await calculateHandValue(game._id, dealer._id, true);
        while (dealerScore < scores.THRESHOLD) {

            const deckCard = await drawCardFromDeck(game._id)
            await createHand(game._id, dealer._id, deckCard.cards);
            await usedGameCards(game._id, deckCard.cards);

            dealerScore = await calculateHandValue(game._id, dealer._id, true);
        }

        if (dealerScore > scores.BLACKJACK_SCORE) {
            game.status = status.WIN;
        } else if (dealerScore > playerScore) {
            game.status = status.BUST;
        } else if (dealerScore < playerScore) {
            game.status = status.WIN;
        } else {
            game.status = status.DRAW;
        }
    }
    await updateGameStatus(game._id, game.status);
    const response = {
        gameId: game._id,
        status: game.status
    }
    return response;
}

