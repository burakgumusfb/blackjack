/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as readline from 'readline';
import { BlackjackModule } from './modules/blackjack/blackjack.module';
import { BlackjackService } from './modules/blackjack/services/blackjack.service';
import { NewGameConsoleParser } from './modules/blackjack/console-parsers/new-game.console.parser';
import { MessageType } from './common/enums/enums';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const blackjackService = app.get(BlackjackService);
  const newGameConsoleParser = app.get(NewGameConsoleParser);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askInformations() {
    rl.question('Please enter your name: ', (playerName) => {
      rl.question('Please enter delay: ', async (delay) => {
        const newGameResult = await blackjackService.newGame({ playerName: playerName, delay: Number(delay) });
        if (newGameResult.messageType == MessageType.SUCCESS) {
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
