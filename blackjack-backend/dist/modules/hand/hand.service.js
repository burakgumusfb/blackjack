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
exports.HandService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums/enums");
const card_schema_1 = require("../../schemas/card.schema");
const game_schema_1 = require("../../schemas/game.schema");
const hand_schema_1 = require("../../schemas/hand.schema");
const player_schema_1 = require("../../schemas/player.schema");
let HandService = exports.HandService = class HandService {
    constructor(gameModel, playerModel, handModel, cardModel) {
        this.gameModel = gameModel;
        this.playerModel = playerModel;
        this.handModel = handModel;
        this.cardModel = cardModel;
    }
    async createHand(game, player, cards) {
        const hands = cards.map((card) => {
            return new this.handModel({
                game: game,
                player: player,
                card: card,
                date_time: new Date(),
            });
        });
        await this.handModel.insertMany(hands);
    }
    async calculateHandValue(gameId, playerId, isDealer = false) {
        const usedCards = await this.handModel
            .find({ game: gameId, player: playerId })
            .select('card -_id')
            .lean();
        if (!usedCards) {
            throw new Error('Used cards were not found.');
        }
        const cardIds = usedCards.map((l) => l.card);
        const cards = await this.cardModel.find({ _id: { $in: cardIds } }).lean();
        if (!cards) {
            throw new Error('Cards were not found.');
        }
        const totalValue = cards.reduce((sum, obj) => {
            return sum + obj.value.reduce((valSum, val) => valSum + val, 0);
        }, 0);
        let aceCount = cards.filter((x) => x.isAce === true).length;
        let adjustedValue = totalValue;
        while (aceCount > 1 && adjustedValue > enums_1.Scores.BLACKJACK_SCORE) {
            adjustedValue -= 12;
            aceCount--;
        }
        if (aceCount >= 1 && adjustedValue > enums_1.Scores.BLACKJACK_SCORE) {
            adjustedValue -= 1;
            aceCount--;
        }
        if (isDealer && aceCount === 1 && adjustedValue < enums_1.Scores.THRESHOLD) {
            const decision = Math.round(Math.random());
            if (decision === 0) {
                adjustedValue -= 10;
            }
            else {
                adjustedValue -= 1;
            }
        }
        return adjustedValue;
    }
    async getHand(playerId, gameId) {
        const cards = await this.handModel.find({ player: playerId, game: gameId }).populate('card').select('card -_id').lean();
        return cards;
    }
};
exports.HandService = HandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    __param(1, (0, mongoose_1.InjectModel)(player_schema_1.Player.name)),
    __param(2, (0, mongoose_1.InjectModel)(hand_schema_1.Hand.name)),
    __param(3, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], HandService);
//# sourceMappingURL=hand.service.js.map