import { Injectable } from '@nestjs/common';
import { DrawCardResultDto } from '../dtos/draw-card-result.dto';
import { GetHandResultDto } from '../dtos/get-hand-result.dto';

@Injectable()
export class GetHandConsoleParser {
  constructor() {}

  parser(getHandResultDto: GetHandResultDto) {
    console.log('\n');
    console.log('New Game Id:' + getHandResultDto.data.gameId);
    console.log("-----Dealer's Hand-----");
    console.log('Card=>' + getHandResultDto.data.dealerCards[0].card.name);
    console.log('Card=>********');
    // console.log('Card=>' + getHandResultDto.data.dealerCards[1].card.name);
    console.log("-----Player's Hand-----");
    console.log('Card=>' + getHandResultDto.data.playerCards[0].card.name);
    console.log('Card=>' + getHandResultDto.data.playerCards[1].card.name);
    console.log('\n');
  }
}
