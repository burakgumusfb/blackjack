/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as readline from 'readline';
import { BlackjackModule } from './modules/blackjack/blackjack.module';
import { BlackjackService } from './modules/blackjack/services/blackjack.service';
import { NewGameConsoleParser } from './modules/blackjack/console-parsers/new-game.console.parser';
import { MessageType } from './common/enums/enums';
import { AppModule } from './app.module';
import { Action } from 'rxjs/internal/scheduler/Action';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const blackjackService = app.get(BlackjackService);
  const newGameConsoleParser = app.get(NewGameConsoleParser);
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
          console.log(newGameResult.message);
          playerGame();
        }
      });
    });
  }
  async function drawCard(playerName) {
    rl.question('Please enter your action (HIT,STAND): ', async (action) => {
      console.log(action)
      const drawCardResult = await blackjackService.drawCard({ playerName: playerName, action: action });
      console.log(drawCardResult);
      if (drawCardResult.messageType == MessageType.SUCCESS) {
        console.log('şurada');
      }
      else {
        console.log('burada');
        console.log(drawCardResult.message);
        drawCard(playerName);
      }
    });
  }
  playerGame();

  await app.close();
}
bootstrap();
