import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';
import { Game } from 'src/schemas/game.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  /**
   * Draws a card from the deck of the specified game that has not been used.
   * @param {string} gameId - The ID of the game.
   * @returns {<Object>} - The card object that has not been used.
   */
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
