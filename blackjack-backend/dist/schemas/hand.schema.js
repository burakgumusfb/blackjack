"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandSchema = exports.Hand = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const game_schema_1 = require("./game.schema");
const player_schema_1 = require("./player.schema");
const card_schema_1 = require("./card.schema");
let Hand = exports.Hand = class Hand extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Game', required: true }),
    __metadata("design:type", game_schema_1.Game)
], Hand.prototype, "game", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", player_schema_1.Player)
], Hand.prototype, "player", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Card', required: true }),
    __metadata("design:type", card_schema_1.Card)
], Hand.prototype, "card", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Hand.prototype, "date_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hand.prototype, "result", void 0);
exports.Hand = Hand = __decorate([
    (0, mongoose_1.Schema)()
], Hand);
exports.HandSchema = mongoose_1.SchemaFactory.createForClass(Hand);
//# sourceMappingURL=hand.schema.js.map