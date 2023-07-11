import { Module } from '@nestjs/common';
import { SchemaModule } from '@schemas/schema.module';
import { BlackjackService } from './services/blackjack.service';
import { CardService } from '../card/card.service';
import { HandService } from '../hand/hand.service';
import { GameService } from '../game/game.service';
import { PlayerService } from '../player/player.service';
import { BlackjackController } from './controllers/blackjack.controller';
import { MigrationService } from '../migration/migration.service';

@Module({
  imports: [SchemaModule],
  providers: [
    BlackjackService,
    CardService,
    HandService,
    GameService,
    PlayerService,
    MigrationService,
  ],
  controllers: [BlackjackController],
  exports: [BlackjackService],
})
export class BlackjackModule {}
