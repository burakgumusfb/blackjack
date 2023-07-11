/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/schemas/player.schema';

@Injectable()
export class PlayerService {
    constructor(
        @InjectModel(Player.name) private readonly playerModel: Model<Player>,
    ) { }

    async createPlayer(playerName, delay): Promise<Player> {
        delay = delay * 1000;
        let player = await this.playerModel
            .findOne({ name: playerName })
            .lean()
            .exec();
        if (!player) {
            const savedPlayer = new this.playerModel({ name: playerName, delay: delay, hasGame: true });
            return await savedPlayer.save();
        } else {
            player = await this.playerModel
                .findOneAndUpdate({ _id: player._id }, { $set: { delay: delay } })
                .exec();
        }
        return player;
    }

    async createDealer(): Promise<Player> {
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
    async setGameStatus(playerName, status): Promise<Player> {
        const player = await this.playerModel
            .findOneAndUpdate({ name: playerName }, { $set: { hasGame: status } })
            .exec();
        return player;
    }
    async getPlayer(playerName): Promise<Player> {
        const player = await this.playerModel.findOne({ name: playerName }).lean();
        if (!player) {
            throw new Error('The player was not found. Please create a player with new-game endpoint.');
        }
        return player;
    }

    async getDealer() {
        const dealer = await this.playerModel.findOne({ name: 'dealer' }).lean();
        if (!dealer) {
            throw new Error('The dealer was not found. Please create a dealer with new-game endpoint.',);
        }
        return dealer;
    }
}
