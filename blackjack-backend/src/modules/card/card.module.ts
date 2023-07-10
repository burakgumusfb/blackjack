import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schemas/schema.module';
import { CardService } from './card.service';

@Module({
  imports: [SchemaModule],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
