/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as readline from 'readline';
import { BlackjackModule } from './modules/blackjack/blackjack.module';
import { BlackjackService } from './modules/blackjack/services/blackjack.service';
import { NewGameConsoleParser } from './modules/blackjack/console-parsers/new-game.console.parser';
import { DrawCardConsoleParser } from './modules/blackjack/console-parsers/draw-card-console.parser';
import { MessageType } from './common/enums/enums';
import { AppModule } from './app.module';
import { GetHandConsoleParser } from './modules/blackjack/console-parsers/get-hand-console.parser';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const blackjackService = app.get(BlackjackService);
  const newGameConsoleParser = app.get(NewGameConsoleParser);
  const drawCardConsoleParser = app.get(DrawCardConsoleParser);
  const getHandConsoleParser = app.get(GetHandConsoleParser);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function playGame() {
    rl.question('Please enter your name: ', async (playerName) => {
      rl.question('Please enter delay: ', async (delay) => {
        const newGameResult = await blackjackService.newGame({ playerName: playerName, delay: Number(delay) });
        if (newGameResult.messageType == MessageType.SUCCESS) {
          newGameConsoleParser.parser(newGameResult);
          await drawCard(playerName, delay);
        }
        else {
          playGame();
        }
      });
    });
  }

  async function drawCard(playerName, delay) {
    rl.question('Please enter your action (HIT OR STAND): ', async (action) => {
      console.log(action)
      const drawCardResult = await blackjackService.drawCard({ playerName: playerName, action: action });
      if (drawCardResult.messageType == MessageType.SUCCESS) {
        drawCardConsoleParser.parser(drawCardResult);
        for (let i = 0; i < delay; i++) {
          console.log("Your new game will start in " + i + " sec.")
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await getHand(playerName);
        await drawCard(playerName,delay);
      }
      else {
        drawCard(playerName, delay);
      }
    });
  }

  async function getHand(playerName) {
    const getHandResult = await blackjackService.getHand(playerName);
    getHandConsoleParser.parser(getHandResult);
  }

  playGame();

  await app.close();
}
bootstrap();
