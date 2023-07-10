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
exports.BlackjackController = void 0;
const common_1 = require("@nestjs/common");
const blackjack_service_1 = require("../services/blackjack.service");
const new_game_dto_1 = require("../dto/new-game.dto");
const draw_card_dto_1 = require("../dto/draw-card.dto");
const migration_service_1 = require("../../migration/migration.service");
let BlackjackController = exports.BlackjackController = class BlackjackController {
    constructor(blackjackService, migrationService) {
        this.blackjackService = blackjackService;
        this.migrationService = migrationService;
    }
    newGame(newGameDto) {
        try {
            this.migrationService.migrationData();
            return this.blackjackService.newGame(newGameDto);
        }
        catch (error) {
            return error.message;
        }
    }
    drawCard(drawCardDto) {
        try {
            return this.blackjackService.drawCard(drawCardDto);
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('new-game'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_game_dto_1.NewGameDto]),
    __metadata("design:returntype", void 0)
], BlackjackController.prototype, "newGame", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('draw-card'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [draw_card_dto_1.DrawCardDto]),
    __metadata("design:returntype", void 0)
], BlackjackController.prototype, "drawCard", null);
exports.BlackjackController = BlackjackController = __decorate([
    (0, common_1.Controller)('blackjack'),
    __metadata("design:paramtypes", [blackjack_service_1.BlackjackService,
        migration_service_1.MigrationService])
], BlackjackController);
//# sourceMappingURL=blackjack.controller.js.map