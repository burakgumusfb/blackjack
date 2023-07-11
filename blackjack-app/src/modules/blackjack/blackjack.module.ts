import { Module } from '@nestjs/common';
import { CustomConfigModule } from 'src/config/custom-config.module';
import { BlackjackService } from './services/blackjack.service';
import { NewGameConsoleParser } from './console-parsers/new-game.console.parser';
import { DrawCardConsoleParser } from './console-parsers/draw-card-console.parser';
import { GetHandConsoleParser } from './console-parsers/get-hand-console.parser';
import { ErrorParser } from './console-parsers/error.parser';

@Module({
  imports: [CustomConfigModule],
  providers: [BlackjackService, NewGameConsoleParser, DrawCardConsoleParser, GetHandConsoleParser, ErrorParser],
  exports: [BlackjackService],
})
export class BlackjackModule { }
