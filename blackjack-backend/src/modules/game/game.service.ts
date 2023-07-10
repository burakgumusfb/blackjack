import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatusEnum } from 'src/common/enums/enums';
import { Game } from 'src/schemas/game.schema';
import { Hand } from 'src/schemas/hand.schema';
import { Player } from 'src/schemas/player.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
    @InjectModel(Hand.name) private readonly handModel: Model<Hand>,
  ) {}

  async createNewGame(playerId, cards): Promise<Game> {
    const newGame = new this.gameModel({
      start_time: new Date(),
      player: playerId,
      status: StatusEnum.PLAYING,
      cards,
    });
    const savedGame = await newGame.save();
    return savedGame;
  }

  async usedGameCards(gameId, cards) {
    for (const card of cards) {
      await this.gameModel
        .updateOne(
          { _id: gameId, 'cards._id': card._id },
          { $set: { 'cards.$.isUsed': true } },
        )
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
        .findOne({ player: player._id, status: StatusEnum.PLAYING })
        .lean();
      return game;
    }
  }
}
