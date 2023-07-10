import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Player, PlayerSchema } from './player.schema';
import { Card, CardSchema } from './card.schema';

export type GameDocument = Game & Document;

@Schema()
export class Game extends Document {
  @Prop({ required: true })
  start_time: Date;

  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  player: Player;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Card', required: true })
  cards: Card[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
