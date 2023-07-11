import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NewGameDto } from '../dtos/new-game.dto';
import { NewGameResultDto } from '../dtos/new-game-result.dto';
import { DrawCardDto } from '../dtos/draw-card.dto';
import { DrawCardResultDto } from '../dtos/draw-card-result.dto';
import { GetHandResultDto } from '../dtos/get-hand-result.dto';

@Injectable()
export class BlackjackService {
  constructor(private readonly httpService: HttpService) { }
  async newGame(newGameDto: NewGameDto): Promise<NewGameResultDto> {
    const newGameResult = await this.httpService.axiosRef.post<NewGameResultDto>('blackjack/new-game', newGameDto);
    return newGameResult.data;
  }
  async drawCard(drawCardDto: DrawCardDto): Promise<DrawCardResultDto> {
    const drawCardResult = await this.httpService.axiosRef.post<DrawCardResultDto>('blackjack/draw-card', drawCardDto);
    return drawCardResult.data;
  }
  async getHand(playerName: string): Promise<GetHandResultDto> {
    const drawCardResult = await this.httpService.axiosRef.get<GetHandResultDto>('blackjack/get-hand?playerName=' + playerName);
    return drawCardResult.data;
  }
}
