/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScoresEnum } from '@common/enums/enums';
import { Card } from '@schemas/card.schema';
import { Hand } from '@schemas/hand.schema';

@Injectable()
export class HandService {
    constructor(
        @InjectModel(Hand.name) private readonly handModel: Model<Hand>,
        @InjectModel(Card.name) private readonly cardModel: Model<Card>,
    ) { }

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

    async calculateHandValue(gameId, playerId, isDealer = false): Promise<number> {
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

        while (aceCount > 1 && adjustedValue > ScoresEnum.BLACKJACK_SCORE) {
            adjustedValue -= 12;
            aceCount--;
        }

        if (aceCount >= 1 && adjustedValue > ScoresEnum.BLACKJACK_SCORE) {
            adjustedValue -= 1;
            aceCount--;
        }

        if (isDealer && aceCount === 1 && adjustedValue < ScoresEnum.THRESHOLD) {
            const decision = Math.round(Math.random());
            if (decision === 0) {
                adjustedValue -= 10;
            } else {
                adjustedValue -= 1;
            }
        }

        return adjustedValue;
    }

    async getHand(playerId, gameId): Promise<any> {
        const cards = await this.handModel.find({ player: playerId, game: gameId }).populate('card').select('card -_id').lean();
        return cards;
    }
}
