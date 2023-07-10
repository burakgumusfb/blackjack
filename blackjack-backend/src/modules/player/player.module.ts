import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schemas/schema.module';
import { PlayerService } from './player.service';

@Module({
  imports: [SchemaModule],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule { }
