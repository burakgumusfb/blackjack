/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Types } from 'mongoose';
import { Game } from './game.schema';
import { Player } from './player.schema';
import { Card } from './card.schema';
export type HandDocument = Hand & Document;
export declare class Hand extends Document {
    game: Game;
    player: Player;
    card: Card;
    date_time: Date;
    result: string;
}
export declare const HandSchema: import("mongoose").Schema<Hand, import("mongoose").Model<Hand, any, any, any, Document<unknown, any, Hand> & Omit<Hand & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hand, Document<unknown, {}, import("mongoose").FlatRecord<Hand>> & Omit<import("mongoose").FlatRecord<Hand> & {
    _id: Types.ObjectId;
}, never>>;
