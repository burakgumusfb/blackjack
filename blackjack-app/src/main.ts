import { NestFactory } from '@nestjs/core';
import * as readline from 'readline';
import { BlackjackModule } from './modules/blackjack/blackjack.module';
import { BlackjackService } from './modules/blackjack/services/blackjack.service';
import { NewGameConsoleParser } from './modules/blackjack/console-parsers/new-game.console.parser';
import { DrawCardConsoleParser } from './modules/blackjack/console-parsers/draw-card-console.parser';
import { MessageType } from './common/enums/enums';
import { AppModule } from './app.module';
import { GetHandConsoleParser } from './modules/blackjack/console-parsers/get-hand-console.parser';
import { ErrorParser } from './modules/blackjack/console-parsers/error.parser';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Game {
  constructor(
    private readonly blackjackService: BlackjackService,
    private readonly newGameConsoleParser: NewGameConsoleParser,
    private readonly drawCardConsoleParser: DrawCardConsoleParser,
    private readonly getHandConsoleParser: GetHandConsoleParser,
    private readonly errorParser: ErrorParser,
    private readonly rl: readline.Interface
  ) { }

  private async playGame(): Promise<void> {
    const playerName = await this.askQuestion('Please enter your name: ');
    const delay = Number(await this.askQuestion('Please enter delay: '));

    const result = await this.blackjackService.newGame({ playerName, delay });

    if (result.messageType === MessageType.SUCCESS) {
      this.newGameConsoleParser.parser(result);
      await this.drawCard(playerName, delay);
    } else {
      await this.errorParser.parser(result);
      await this.playGame();
    }
  }

  private async drawCard(playerName: string, delay: number): Promise<void> {
    const action = await this.askQuestion('Please enter your action (HIT OR STAND): ');
    const response = await this.blackjackService.drawCard({ playerName, action });

    if (response.messageType === MessageType.SUCCESS) {
      await this.drawCardConsoleParser.parser(response);

      for (let i = 1; i <=delay; i++) {
        console.log(`Your new game will start in ${i} sec.`);
        await sleep(1000);
      }

      await this.getHand(playerName);
      await this.drawCard(playerName, delay);
    } else {
      await this.drawCard(playerName, delay);
    }
  }

  private async getHand(playerName: string): Promise<void> {
    const response = await this.blackjackService.getHand(playerName);
    await this.getHandConsoleParser.parser(response);
  }

  private askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  public async start(): Promise<void> {
    await this.playGame();
    this.rl.close();
  }
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const blackjackService = app.get(BlackjackService);
  const newGameConsoleParser = app.get(NewGameConsoleParser);
  const drawCardConsoleParser = app.get(DrawCardConsoleParser);
  const getHandConsoleParser = app.get(GetHandConsoleParser);
  const errorParser = app.get(ErrorParser);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const game = new Game(
    blackjackService,
    newGameConsoleParser,
    drawCardConsoleParser,
    getHandConsoleParser,
    errorParser,
    rl
  );
  await game.start();

  await app.close();
}

bootstrap();
