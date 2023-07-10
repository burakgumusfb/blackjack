import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';
import { Game } from 'src/schemas/game.schema';
import { Hand } from 'src/schemas/hand.schema';
import { Player } from 'src/schemas/player.schema';
export declare class HandService {
    private readonly gameModel;
    private readonly playerModel;
    private readonly handModel;
    private readonly cardModel;
    constructor(gameModel: Model<Game>, playerModel: Model<Player>, handModel: Model<Hand>, cardModel: Model<Card>);
    createHand(game: any, player: any, cards: any): Promise<void>;
    calculateHandValue(gameId: any, playerId: any, isDealer?: boolean): Promise<number>;
    getHand(playerId: any, gameId: any): Promise<any>;
}
