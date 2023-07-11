"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const readline = require("readline");
const blackjack_service_1 = require("./modules/blackjack/services/blackjack.service");
const new_game_console_parser_1 = require("./modules/blackjack/console-parsers/new-game.console.parser");
const enums_1 = require("./common/enums/enums");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const blackjackService = app.get(blackjack_service_1.BlackjackService);
    const newGameConsoleParser = app.get(new_game_console_parser_1.NewGameConsoleParser);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    function askInformations() {
        rl.question('Please enter your name: ', (playerName) => {
            rl.question('Please enter delay: ', async (delay) => {
                const newGameResult = await blackjackService.newGame({ playerName: playerName, delay: Number(delay) });
                if (newGameResult.messageType == enums_1.MessageType.SUCCESS) {
                    newGameConsoleParser.parser(newGameResult);
                    rl.close();
                }
                else {
                    console.log(newGameResult.message);
                    askInformations();
                }
            });
        });
    }
    askInformations();
    await app.close();
}
bootstrap();
//# sourceMappingURL=main.js.map