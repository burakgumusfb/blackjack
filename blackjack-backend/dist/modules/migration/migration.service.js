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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const card_schema_1 = require("../../schemas/card.schema");
const fs = require("fs-extra");
let MigrationService = exports.MigrationService = class MigrationService {
    constructor(cardModel) {
        this.cardModel = cardModel;
    }
    async migrationData() {
        const data = fs.readFileSync('./src/data/db.json', 'utf8');
        const cards = JSON.parse(data);
        const cardCount = await this.cardModel.countDocuments({}).lean();
        if (cardCount === 312) {
            return;
        }
        await this.cardModel.deleteMany({});
        for (const card of cards) {
            for (let j = 1; j <= 6; j++) {
                const checkCard = await this.cardModel
                    .findOne({ name: card.name, type: card.type, deck: j })
                    .lean();
                if (!checkCard) {
                    const newCard = new this.cardModel({
                        name: card.name,
                        value: card.value,
                        type: card.type,
                        isAce: card.isAce,
                        deck: j,
                    });
                    await newCard.save();
                }
            }
        }
    }
};
exports.MigrationService = MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(card_schema_1.Card.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MigrationService);
//# sourceMappingURL=migration.service.js.map