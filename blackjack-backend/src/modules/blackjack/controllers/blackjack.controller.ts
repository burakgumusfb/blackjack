import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BlackjackService } from '../services/blackjack.service';
import { NewGameDto } from '../dto/new-game.dto';
import { DrawCardDto } from '../dto/draw-card.dto';
import { MigrationService } from 'src/modules/migration/migration.service';

@Controller('blackjack')
export class BlackjackController {
  constructor(
    private blackjackService: BlackjackService,
    private migrationService: MigrationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('new-game')
  newGame(@Body() newGameDto: NewGameDto) {
    try {
      this.migrationService.migrationData();
      return this.blackjackService.newGame(newGameDto);
    } catch (error) {
      return error.message;
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
}
