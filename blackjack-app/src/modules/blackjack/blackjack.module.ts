import { Module } from '@nestjs/common';
import { CustomConfigModule } from 'src/config/custom-config.module';
import { BlackjackService } from './services/blackjack.service';
import { NewGameConsoleParser } from './console-parsers/new-game.console.parser';

@Module({
  imports: [CustomConfigModule],
  providers: [BlackjackService, NewGameConsoleParser],
  exports: [BlackjackService],
})
export class BlackjackModule { }
