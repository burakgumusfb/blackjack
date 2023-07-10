import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './card.schema';
import { HandSchema } from './hand.schema';
import { GameSchema } from './game.schema';
import { PlayerSchema } from './player.schema';

const schemas = [
  { name: 'Card', schema: CardSchema },
  { name: 'Hand', schema: HandSchema },
  { name: 'Game', schema: GameSchema },
  { name: 'Player', schema: PlayerSchema },
];

@Module({
  imports: [MongooseModule.forFeature(schemas)],
  exports: [MongooseModule.forFeature(schemas)],
})
export class SchemaModule {}
