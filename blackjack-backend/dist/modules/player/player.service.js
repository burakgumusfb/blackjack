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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const player_schema_1 = require("../../schemas/player.schema");
let PlayerService = exports.PlayerService = class PlayerService {
    constructor(playerModel) {
        this.playerModel = playerModel;
    }
    async createPlayer(playerName, delay) {
        delay = delay * 1000;
        let player = await this.playerModel
            .findOne({ name: playerName })
            .lean()
            .exec();
        if (!player) {
            const savedPlayer = new this.playerModel({ name: playerName, delay: delay });
            return await savedPlayer.save();
        }
        else {
            player = await this.playerModel
                .findOneAndUpdate({ _id: player._id }, { $set: { delay: delay } })
                .exec();
        }
        return player;
    }
    async createDealer() {
        const dealer = await this.playerModel
            .findOne({ name: 'dealer' })
            .lean()
            .exec();
        if (!dealer) {
            const savedPlayer = new this.playerModel({ name: 'dealer' });
            return await savedPlayer.save();
        }
        return dealer;
    }
    async setGameStatus(playerName, status) {
        const player = await this.playerModel
            .findOneAndUpdate({ name: playerName }, { $set: { hasGame: status } })
            .exec();
        return player;
    }
    async getPlayer(playerName) {
        const player = await this.playerModel.findOne({ name: playerName }).lean();
        if (!player) {
            throw new Error('The player was not found. Please create a player with new-game endpoint.');
        }
        return player;
    }
    async getDealer() {
        const dealer = await this.playerModel.findOne({ name: 'dealer' }).lean();
        if (!dealer) {
            throw new Error('The dealer was not found. Please create a dealer with new-game endpoint.');
        }
        return dealer;
    }
};
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(player_schema_1.Player.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PlayerService);
//# sourceMappingURL=player.service.js.map