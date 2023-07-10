import { BlackjackService } from '../services/blackjack.service';
import { NewGameDto } from '../dto/new-game.dto';
import { DrawCardDto } from '../dto/draw-card.dto';
import { MigrationService } from 'src/modules/migration/migration.service';
export declare class BlackjackController {
    private blackjackService;
    private migrationService;
    constructor(blackjackService: BlackjackService, migrationService: MigrationService);
    newGame(newGameDto: NewGameDto): any;
    drawCard(drawCardDto: DrawCardDto): any;
}
