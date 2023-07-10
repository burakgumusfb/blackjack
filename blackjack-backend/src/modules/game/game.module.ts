import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schemas/schema.module';
import { GameService } from './game.service';

@Module({
  imports: [SchemaModule],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
