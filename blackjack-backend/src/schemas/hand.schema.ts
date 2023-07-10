import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Game, GameSchema } from './game.schema';
import { Player, PlayerSchema } from './player.schema';
import { Card, CardSchema } from './card.schema';

export type HandDocument = Hand & Document;

@Schema()
export class Hand extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Game', required: true })
  game: Game;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  player: Player;

  @Prop({ type: Types.ObjectId, ref: 'Card', required: true })
  card: Card;

  @Prop({ default: Date.now })
  date_time: Date;

  @Prop()
  result: string;
}

export const HandSchema = SchemaFactory.createForClass(Hand);
