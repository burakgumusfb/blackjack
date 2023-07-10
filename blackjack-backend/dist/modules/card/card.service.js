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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const card_schema_1 = require("../../schemas/card.schema");
const game_schema_1 = require("../../schemas/game.schema");
let CardService = exports.CardService = class CardService {
    constructor(gameModel, cardModel) {
        this.gameModel = gameModel;
        this.cardModel = cardModel;
    }
    async drawCardFromDeck(gameId) {
        const card = await this.gameModel
            .findOne({ _id: gameId }, { cards: { $elemMatch: { isUsed: false } } })
            .lean();
        return card;
    }
    async getCardsCount() {
        const cardCount = await this.cardModel.count({}).lean();
        return cardCount;
    }
};
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    __param(1, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CardService);
//# sourceMappingURL=card.service.js.map