import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card extends Document {
  @Prop({ type: [Number], required: true })
  value: number[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  deck: number;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Boolean })
  isAce?: boolean;

  @Prop({ type: Boolean, default: false })
  isUsed?: boolean;
}

export const CardSchema = SchemaFactory.createForClass(Card);