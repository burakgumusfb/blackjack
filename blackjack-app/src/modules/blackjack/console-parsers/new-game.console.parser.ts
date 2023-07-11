import { Injectable } from '@nestjs/common';
import { NewGameResultDto } from '../dtos/new-game-result.dto';

@Injectable()
export class NewGameConsoleParser {
  constructor() { }

  async parser(newGameResultDto: NewGameResultDto) {
    console.log('\n');
    console.log('Game Id:' + newGameResultDto.data.gameId);
    console.log('-----Dealer Cards-----');
    console.log('Card=>' + newGameResultDto.data.dealerCards[0].card.name);
    console.log('Card=>********');
    console.log('-----Player Cards-----');
    console.log('Card=>' + newGameResultDto.data.playerCards[0].card.name);
    console.log('Card=>' + newGameResultDto.data.playerCards[1].card.name);
    console.log('\n');
  }
}
