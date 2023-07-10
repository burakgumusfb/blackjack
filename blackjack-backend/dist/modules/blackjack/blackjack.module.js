"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackjackModule = void 0;
const common_1 = require("@nestjs/common");
const schema_module_1 = require("../../schemas/schema.module");
const blackjack_service_1 = require("./services/blackjack.service");
const card_service_1 = require("../card/card.service");
const hand_service_1 = require("../hand/hand.service");
const game_service_1 = require("../game/game.service");
const player_service_1 = require("../player/player.service");
const blackjack_controller_1 = require("./controllers/blackjack.controller");
const migration_service_1 = require("../migration/migration.service");
let BlackjackModule = exports.BlackjackModule = class BlackjackModule {
};
exports.BlackjackModule = BlackjackModule = __decorate([
    (0, common_1.Module)({
        imports: [schema_module_1.SchemaModule],
        providers: [
            blackjack_service_1.BlackjackService,
            card_service_1.CardService,
            hand_service_1.HandService,
            game_service_1.GameService,
            player_service_1.PlayerService,
            migration_service_1.MigrationService,
        ],
        controllers: [blackjack_controller_1.BlackjackController],
        exports: [blackjack_service_1.BlackjackService],
    })
], BlackjackModule);
//# sourceMappingURL=blackjack.module.js.map