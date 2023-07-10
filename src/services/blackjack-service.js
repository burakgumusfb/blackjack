const { Card } = require('../models/card');
const playerService = require('./player-service');
const gameService = require('./game-service');
const handService = require('./hand-service');
const cardService = require('./card-service');
const { actions, scores, status } = require('../constants/constants');

/**
 * Shuffles the cards.
 **/
function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

/**
 * Creates a new game between the player and the dealer.
 * @param {string} playerName - The name of the player.
 * @param {number} delay - The delay in milliseconds before the game starts.
 * @returns {<Object>} - The response object containing the gameId, dealerCards, and playerCards.
 * @throws {Error} - If the player already has an active game, an error is thrown.
 */
exports.newGame = async (playerName, delay) => {
    const activeGame = await gameService.getActiveGame(playerName);
    if (activeGame) {
        throw new Error("You already have a game. Please continue with the draw-card endpoint.");
    }

    const dealer = await playerService.createDealer();
    const player = await playerService.createPlayer(playerName, delay);

    await new Promise(resolve => setTimeout(resolve, player.delay));

    const cards = await Card.find().lean().exec();
    const shuffledCards = shuffleCards(cards);
    const savedGame = await gameService.createNewGame(player._id, shuffledCards);

    let playerCards = shuffledCards.splice(0, 2);
    let dealerCards = shuffledCards.splice(0, 2);

    await handService.createHand(savedGame._id, player._id, playerCards);
    await handService.createHand(savedGame._id, dealer._id, dealerCards);

    const usedCards = playerCards.concat(dealerCards);
    await gameService.usedGameCards(savedGame._id, usedCards);

    playerCards = await handService.getHand(player._id, savedGame._id);
    dealerCards = await handService.getHand(dealer._id, savedGame._id);

    const response = {
        gameId: savedGame._id,
        dealerCards,
        playerCards
    };

    return response;
};

/**
 * Draws a card from the deck and updates the game status accordingly.
 * @param {string} playerName - The name of the player.
 * @param {string} action - The action to perform (HIT or STAND).
 * @returns {<Object>} - The response object containing the gameId, status, and info message.
 * @throws {Error} - If the active game is not found or a card is not found in the deck, an error is thrown.
 */
exports.drawCard = async (playerName, action) => {
    const player = await playerService.getPlayer(playerName);
    if (!player) {
        throw new Error("Please call first new-game endpoint.");
    }
    const playerDelay = player.delay / 1000;
    const game = await gameService.getActiveGame(playerName);
    if (!game) {
        this.newGame(playerName, playerDelay)
        throw new Error("Your game will be ready in your delay second/s.");
    }

    let playerScore = await handService.calculateHandValue(game._id, player._id);
    if (action === actions.HIT && playerScore < scores.BLACKJACK_SCORE) {
        const deckCard = await cardService.drawCardFromDeck(game._id);
        if (!deckCard) {
            throw new Error("Card was not found in the deck.");
        }

        await handService.createHand(game._id, player._id, deckCard.cards);
        await gameService.usedGameCards(game._id, deckCard.cards);

        playerScore = await handService.calculateHandValue(game._id, player._id);

        if (playerScore > scores.BLACKJACK_SCORE) {
            game.status = status.BUST;
        }
    }

    if (game.status === status.PLAYING) {
        const dealer = await playerService.getDealer();
        let dealerScore = await handService.calculateHandValue(game._id, dealer._id, true);
        while (dealerScore < scores.THRESHOLD) {
            const deckCard = await cardService.drawCardFromDeck(game._id);
            await handService.createHand(game._id, dealer._id, deckCard.cards);
            await gameService.usedGameCards(game._id, deckCard.cards);

            dealerScore = await handService.calculateHandValue(game._id, dealer._id, true);
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

    await gameService.updateGameStatus(game._id, game.status);

    const response = {
        gameId: game._id,
        status: game.status,
        info: `New game will be ready in ${playerDelay} sec`
    };

    this.newGame(playerName, playerDelay);

    return response;
};


/**
 * Retrieves the player's and dealer's current hand in the active game.
 * @param {string} playerName - The name of the player.
 * @returns {<Object>} - The response object containing the gameId, dealerCards, and playerCards.
 * @throws {Error} - If the active game is not found, an error is thrown.
 */
exports.getHand = async (playerName) => {
    const player = await playerService.getPlayer(playerName);
    const dealer = await playerService.getDealer();

    const game = await gameService.getActiveGame(playerName);
    if (!game) {
        throw new Error("The game was not found. Please create a new game.");
    }

    const playerCards = await handService.getHand(player._id, game._id);
    const dealerCards = await handService.getHand(dealer._id, game._id);

    if (!playerCards){
        throw new Error("Player hand is empty.");
    }

    if (!dealerCards){
        throw new Error("Dealer hand is empty.");
    }

    const response = {
        gameId: game._id,
        dealerCards,
        playerCards
    };

    return response;
};
