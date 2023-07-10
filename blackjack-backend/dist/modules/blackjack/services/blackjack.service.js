"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackjackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../../common/enums/enums");
const card_service_1 = require("../../card/card.service");
const game_service_1 = require("../../game/game.service");
const hand_service_1 = require("../../hand/hand.service");
const player_service_1 = require("../../player/player.service");
const card_schema_1 = require("../../../schemas/card.schema");
let BlackjackService = exports.BlackjackService = class BlackjackService {
    constructor(cardModel, gameService, playerService, handService, cardService) {
        this.cardModel = cardModel;
        this.gameService = gameService;
        this.playerService = playerService;
        this.handService = handService;
        this.cardService = cardService;
    }
    shuffleCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }
    async newGame(newGameDto) {
        try {
            const activeGame = await this.gameService.getActiveGame(newGameDto.playerName);
            if (activeGame) {
                throw new common_1.InternalServerErrorException('You already have a game. Please continue with the draw-card endpoint.');
            }
            const dealer = await this.playerService.createDealer();
            const player = await this.playerService.createPlayer(newGameDto.playerName, newGameDto.delay);
            await new Promise((resolve) => setTimeout(resolve, player.delay));
            const cards = await this.cardModel.find().lean().exec();
            const shuffledCards = this.shuffleCards(cards);
            const savedGame = await this.gameService.createNewGame(player._id, shuffledCards);
            let playerCards = shuffledCards.splice(0, 2);
            let dealerCards = shuffledCards.splice(0, 2);
            await this.handService.createHand(savedGame._id, player._id, playerCards);
            await this.handService.createHand(savedGame._id, dealer._id, dealerCards);
            const usedCards = playerCards.concat(dealerCards);
            await this.gameService.usedGameCards(savedGame._id, usedCards);
            playerCards = await this.handService.getHand(player._id, savedGame._id);
            dealerCards = await this.handService.getHand(dealer._id, savedGame._id);
            const response = {
                gameId: savedGame._id,
                dealerCards,
                playerCards,
            };
            return response;
        }
        catch (err) {
            return err.message;
        }
    }
    async drawCard(drawCard) {
        let response = { gameId: undefined, info: 'Your game will be ready...', status: undefined };
        const player = await this.playerService.getPlayer(drawCard.playerName);
        if (!player) {
            throw new common_1.InternalServerErrorException('Please call first new-game endpoint.');
        }
        const playerDelay = player.delay / 1000;
        const game = await this.gameService.getActiveGame(drawCard.playerName);
        if (!game && !player.hasGame) {
            await this.playerService.setGameStatus(drawCard.playerName, true);
            this.newGame({ playerName: drawCard.playerName, delay: playerDelay });
            response.info = 'Your game will be ready in your delay second/s.';
            return response;
        }
        if (player.hasGame == true && game) {
            let playerScore = await this.handService.calculateHandValue(game._id, player._id);
            if (drawCard.action !== enums_1.Actions.HIT && drawCard.action !== enums_1.Actions.STAND)
                throw new common_1.InternalServerErrorException('Wrong action.');
            if (drawCard.action === enums_1.Actions.HIT && playerScore < enums_1.Scores.BLACKJACK_SCORE) {
                const deckCard = await this.cardService.drawCardFromDeck(game._id);
                if (!deckCard) {
                    throw new common_1.InternalServerErrorException('Card was not found in the deck.');
                }
                await this.handService.createHand(game._id, player._id, deckCard.cards);
                await this.gameService.usedGameCards(game._id, deckCard.cards);
                playerScore = await this.handService.calculateHandValue(game._id, player._id);
                if (playerScore > enums_1.Scores.BLACKJACK_SCORE) {
                    game.status = enums_1.Status.BUST;
                }
            }
            if (game.status === enums_1.Status.PLAYING) {
                const dealer = await this.playerService.getDealer();
                let dealerScore = await this.handService.calculateHandValue(game._id, dealer._id, true);
                while (dealerScore < enums_1.Scores.THRESHOLD) {
                    const deckCard = await this.cardService.drawCardFromDeck(game._id);
                    await this.handService.createHand(game._id, dealer._id, deckCard.cards);
                    await this.gameService.usedGameCards(game._id, deckCard.cards);
                    dealerScore = await this.handService.calculateHandValue(game._id, dealer._id, true);
                }
                if (dealerScore > enums_1.Scores.BLACKJACK_SCORE) {
                    game.status = enums_1.Status.WIN;
                }
                else if (dealerScore > playerScore) {
                    game.status = enums_1.Status.BUST;
                }
                else if (dealerScore < playerScore) {
                    game.status = enums_1.Status.WIN;
                }
                else {
                    game.status = enums_1.Status.DRAW;
                }
            }
            await this.gameService.updateGameStatus(game._id, game.status);
            await this.playerService.setGameStatus(drawCard.playerName, false);
            response.gameId = game._id;
            response.status = game.status;
            response.info = `New game will be ready in ${playerDelay} sec`;
            this.newGame({ playerName: drawCard.playerName, delay: playerDelay });
            await this.playerService.setGameStatus(drawCard.playerName, true);
        }
        return response;
    }
    async getHand(playerName) {
        const player = await this.playerService.getPlayer(playerName);
        const dealer = await this.playerService.getDealer();
        const game = await this.gameService.getActiveGame(playerName);
        if (!game) {
            throw new common_1.InternalServerErrorException('The game was not found. Please create a new game.');
        }
        const playerCards = await this.handService.getHand(player._id, game._id);
        const dealerCards = await this.handService.getHand(dealer._id, game._id);
        if (!playerCards) {
            throw new common_1.InternalServerErrorException('Player hand is empty.');
        }
        if (!dealerCards) {
            throw new common_1.InternalServerErrorException('Dealer hand is empty.');
        }
        const response = {
            gameId: game._id,
            dealerCards,
            playerCards,
        };
        return response;
    }
};
exports.BlackjackService = BlackjackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        game_service_1.GameService,
        player_service_1.PlayerService,
        hand_service_1.HandService,
        card_service_1.CardService])
], BlackjackService);
//# sourceMappingURL=blackjack.service.js.map