/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { BlackjackService } from '../services/blackjack.service';
import { NewGameDto } from '../dto/new-game.dto';
import { DrawCardDto } from '../dto/draw-card.dto';
import { MigrationService } from 'src/modules/migration/migration.service';

@Controller('blackjack')
export class BlackjackController {
  constructor(private blackjackService: BlackjackService) {}

  @HttpCode(HttpStatus.OK)
  @Post('new-game')
  newGame(@Body() newGameDto: NewGameDto) {
    try {
      return this.blackjackService.newGame(newGameDto);
    } catch (error) {
      return error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('draw-card')
  drawCard(@Body() drawCardDto: DrawCardDto) {
    try {
      return this.blackjackService.drawCard(drawCardDto);
    } catch (error) {
      return error;
    }
  }
  @HttpCode(HttpStatus.OK)
  @Get('get-hand')
  getHand(@Query() query) {
    try {
      return this.blackjackService.getHand(query.playerName);
    } catch (error) {
      return error;
    }
  }
}
