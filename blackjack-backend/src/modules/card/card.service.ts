import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from '@schemas/card.schema';
import { Game } from '@schemas/game.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async drawCardFromDeck(gameId): Promise<any> {
    const card = await this.gameModel
      .findOne({ _id: gameId }, { cards: { $elemMatch: { isUsed: false } } })
      .lean();

    return card;
  }

  async getCardsCount() {
    const cardCount = await this.cardModel.count({}).lean();
    return cardCount;
  }
}
