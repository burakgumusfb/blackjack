/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as readline from 'readline';
import { BlackjackModule } from './modules/blackjack/blackjack.module';
import { BlackjackService } from './modules/blackjack/services/blackjack.service';
import { NewGameConsoleParser } from './modules/blackjack/console-parsers/new-game.console.parser';
import { MessageType } from './common/enums/enums';
import { AppModule } from './app.module';
import { DrawCardConsoleParser } from './modules/blackjack/console-parsers/draw-card-console.parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const blackjackService = app.get(BlackjackService);
  const newGameConsoleParser = app.get(NewGameConsoleParser);
  const drawCardConsoleParser = app.get(DrawCardConsoleParser);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function playerGame() {
    rl.question('Please enter your name: ', async (playerName) => {
      rl.question('Please enter delay: ', async (delay) => {
        const newGameResult = await blackjackService.newGame({ playerName: playerName, delay: Number(delay) });
        if (newGameResult.messageType == MessageType.SUCCESS) {
          newGameConsoleParser.parser(newGameResult);
          await drawCard(playerName);
        }
        else {
          playerGame();
        }
      });
    });
  }

  async function drawCard(playerName) {
    rl.question('Please enter your action (HIT,STAND): ', async (action) => {
      console.log(action)
      const drawCardResult = await blackjackService.drawCard({ playerName: playerName, action: action });
      if (drawCardResult.messageType == MessageType.SUCCESS) {
        drawCardConsoleParser.parser(drawCardResult);
      }
      else {
        drawCard(playerName);
      }
    });
  }
  playerGame();

  await app.close();
}
bootstrap();
