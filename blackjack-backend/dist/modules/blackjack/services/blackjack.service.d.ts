import { Model } from 'mongoose';
import { CardService } from 'src/modules/card/card.service';
import { GameService } from 'src/modules/game/game.service';
import { HandService } from 'src/modules/hand/hand.service';
import { PlayerService } from 'src/modules/player/player.service';
import { Card } from 'src/schemas/card.schema';
import { NewGameDto } from '../dtos/new-game.dto';
import { DrawCardDto } from '../dtos/draw-card.dto';
import { NewGameResultDto } from '../dtos/new-game-result.dto';
export declare class BlackjackService {
    private readonly cardModel;
    private gameService;
    private playerService;
    private handService;
    private cardService;
    constructor(cardModel: Model<Card>, gameService: GameService, playerService: PlayerService, handService: HandService, cardService: CardService);
    shuffleCards(cards: any): any;
    newGame(newGameDto: NewGameDto): Promise<NewGameResultDto>;
    drawCard(drawCard: DrawCardDto): Promise<any>;
    getHand(playerName: any): Promise<any>;
}
