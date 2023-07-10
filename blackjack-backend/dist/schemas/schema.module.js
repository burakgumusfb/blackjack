"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const card_schema_1 = require("./card.schema");
const hand_schema_1 = require("./hand.schema");
const game_schema_1 = require("./game.schema");
const player_schema_1 = require("./player.schema");
const schemas = [
    { name: 'Card', schema: card_schema_1.CardSchema },
    { name: 'Hand', schema: hand_schema_1.HandSchema },
    { name: 'Game', schema: game_schema_1.GameSchema },
    { name: 'Player', schema: player_schema_1.PlayerSchema },
];
let SchemaModule = exports.SchemaModule = class SchemaModule {
};
exports.SchemaModule = SchemaModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(schemas)],
        exports: [mongoose_1.MongooseModule.forFeature(schemas)],
    })
], SchemaModule);
//# sourceMappingURL=schema.module.js.map