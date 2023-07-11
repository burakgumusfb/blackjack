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
const custom_config_module_1 = require("../../config/custom-config.module");
const blackjack_service_1 = require("./services/blackjack.service");
const new_game_console_parser_1 = require("./console-parsers/new-game.console.parser");
let BlackjackModule = exports.BlackjackModule = class BlackjackModule {
};
exports.BlackjackModule = BlackjackModule = __decorate([
    (0, common_1.Module)({
        imports: [custom_config_module_1.CustomConfigModule],
        providers: [blackjack_service_1.BlackjackService, new_game_console_parser_1.NewGameConsoleParser],
        exports: [blackjack_service_1.BlackjackService],
    })
], BlackjackModule);
//# sourceMappingURL=blackjack.module.js.map