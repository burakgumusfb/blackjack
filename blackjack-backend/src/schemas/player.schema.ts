import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number })
  delay?: number;

  @Prop({ type: Number })
  hasGame?: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
