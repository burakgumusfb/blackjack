import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';
import { Hand } from 'src/schemas/hand.schema';
export declare class HandService {
    private readonly handModel;
    private readonly cardModel;
    constructor(handModel: Model<Hand>, cardModel: Model<Card>);
    createHand(game: any, player: any, cards: any): Promise<void>;
    calculateHandValue(gameId: any, playerId: any, isDealer?: boolean): Promise<number>;
    getHand(playerId: any, gameId: any): Promise<any>;
}
