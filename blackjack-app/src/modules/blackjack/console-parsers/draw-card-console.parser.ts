import { Injectable } from '@nestjs/common';
import { DrawCardResultDto } from '../dtos/draw-card-result.dto';

@Injectable()
export class DrawCardConsoleParser {
  constructor() {}

  async parser(drawCardResultDto: DrawCardResultDto) {
    console.log('\n');
    console.log('New Game Id:' + drawCardResultDto.data.gameId);
    console.log('Game Status:' + drawCardResultDto.data.status);
    console.log('Dealer Score:' + drawCardResultDto.data.dealerScore);
    console.log('Player Score:' + drawCardResultDto.data.playerScore);
    console.log('Message:' + drawCardResultDto.data.status);
    console.log('\n');
  }
}
