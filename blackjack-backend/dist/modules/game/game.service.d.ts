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
import { Model, Types } from 'mongoose';
import { Game } from 'src/schemas/game.schema';
import { Hand } from 'src/schemas/hand.schema';
import { Player } from 'src/schemas/player.schema';
export declare class GameService {
    private readonly gameModel;
    private readonly playerModel;
    private readonly handModel;
    constructor(gameModel: Model<Game>, playerModel: Model<Player>, handModel: Model<Hand>);
    createNewGame(playerId: any, cards: any): Promise<Game>;
    usedGameCards(gameId: any, cards: any): Promise<void>;
    deleteBeforeGames(playerName: any): Promise<void>;
    updateGameStatus(gameId: any, gameStatus: any): Promise<void>;
    getActiveGame(playerName: any): Promise<import("mongoose").FlattenMaps<Game> & {
        _id: Types.ObjectId;
    }>;
}
