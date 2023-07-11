import { HttpService } from '@nestjs/axios';
import { NewGameDto } from '../dtos/new-game.dto';
import { NewGameResultDto } from '../dtos/new-game-result.dto';
export declare class BlackjackService {
    private readonly httpService;
    constructor(httpService: HttpService);
    newGame(newGameDto: NewGameDto): Promise<NewGameResultDto>;
}
