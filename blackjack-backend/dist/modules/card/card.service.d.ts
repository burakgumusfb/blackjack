import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';
import { Game } from 'src/schemas/game.schema';
export declare class CardService {
    private readonly gameModel;
    private readonly cardModel;
    constructor(gameModel: Model<Game>, cardModel: Model<Card>);
    drawCardFromDeck(gameId: any): Promise<any>;
    getCardsCount(): Promise<number>;
}
