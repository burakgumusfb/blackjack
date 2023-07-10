import { BlackjackService } from '../services/blackjack.service';
import { NewGameDto } from '../dtos/new-game.dto';
import { DrawCardDto } from '../dtos/draw-card.dto';
export declare class BlackjackController {
    private blackjackService;
    constructor(blackjackService: BlackjackService);
    newGame(newGameDto: NewGameDto): any;
    drawCard(drawCardDto: DrawCardDto): any;
    getHand(query: any): any;
}
