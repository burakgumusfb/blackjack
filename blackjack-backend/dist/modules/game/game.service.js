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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums/enums");
const game_schema_1 = require("../../schemas/game.schema");
const hand_schema_1 = require("../../schemas/hand.schema");
const player_schema_1 = require("../../schemas/player.schema");
let GameService = exports.GameService = class GameService {
    constructor(gameModel, playerModel, handModel) {
        this.gameModel = gameModel;
        this.playerModel = playerModel;
        this.handModel = handModel;
    }
    async createNewGame(playerId, cards) {
        const newGame = new this.gameModel({
            start_time: new Date(),
            player: playerId,
            status: enums_1.StatusEnum.PLAYING,
            cards,
        });
        const savedGame = await newGame.save();
        return savedGame;
    }
    async usedGameCards(gameId, cards) {
        for (const card of cards) {
            await this.gameModel
                .updateOne({ _id: gameId, 'cards._id': card._id }, { $set: { 'cards.$.isUsed': true } })
                .exec();
        }
    }
    async deleteBeforeGames(playerName) {
        const player = await this.playerModel.findOne({ name: playerName }).lean();
        if (player) {
            const game = await this.gameModel
                .findOneAndDelete({ player: player._id })
                .exec();
            if (game) {
                await this.handModel.deleteMany({ game: game._id }).exec();
            }
        }
    }
    async updateGameStatus(gameId, gameStatus) {
        await this.gameModel
            .updateOne({ _id: gameId }, { $set: { status: gameStatus } })
            .exec();
    }
    async getActiveGame(playerName) {
        const player = await this.playerModel.findOne({ name: playerName }).lean();
        if (player) {
            const game = await this.gameModel
                .findOne({ player: player._id, status: enums_1.StatusEnum.PLAYING })
                .lean();
            return game;
        }
    }
};
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    __param(1, (0, mongoose_1.InjectModel)(player_schema_1.Player.name)),
    __param(2, (0, mongoose_1.InjectModel)(hand_schema_1.Hand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GameService);
//# sourceMappingURL=game.service.js.map