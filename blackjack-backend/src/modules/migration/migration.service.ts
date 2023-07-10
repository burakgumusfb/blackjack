import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';
import * as fs from 'fs-extra';

@Injectable()
export class MigrationService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async migrationData() {
    const data = fs.readFileSync('./src/data/db.json', 'utf8');
    const cards = JSON.parse(data);

    const cardCount = await this.cardModel.countDocuments({}).lean();
    if (cardCount === 312) {
      return;
    }

    await this.cardModel.deleteMany({});

    for (const card of cards) {
      for (let j = 1; j <= 6; j++) {
        const checkCard = await this.cardModel
          .findOne({ name: card.name, type: card.type, deck: j })
          .lean();
        if (!checkCard) {
          const newCard = new this.cardModel({
            name: card.name,
            value: card.value,
            type: card.type,
            isAce: card.isAce,
            deck: j,
          });
          await newCard.save();
        }
      }
    }
  }
}
