/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from '@modules/player/player.service';
import { SchemaModule } from '@app/schemas/schema.module';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { Card } from '@app/schemas/card.schema';
import { Model } from 'mongoose';
import { GameService } from '@app/modules/game/game.service';
import { MigrationService } from '@app/modules/migration/migration.service';
import { getModelToken } from '@nestjs/mongoose';
import { HandService } from '@app/modules/hand/hand.service';
import { GameDataDto, NewGameResultDto } from '@app/modules/blackjack/dtos/new-game-result.dto';
import { ActionsEnum, MessageType, StatusEnum } from '@app/common/enums/enums';
import { DrawCardDataDto, DrawCardResultDto } from '@app/modules/blackjack/dtos/draw-card-result.dto';
import { BlackjackService } from '@app/modules/blackjack/services/blackjack.service';
import { CardService } from '@app/modules/card/card.service';
import { BlackjackModule } from '@app/modules/blackjack/blackjack.module';

describe('BlackJackService', () => {

  let migrationService: MigrationService
  let blackjackService: BlackjackService;
  const playerData = { name: 'test', delay: 5, action: 'HIT' };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaModule, CustomConfigModule, BlackjackModule],
      providers: [],
    }).compile();
    migrationService = module.get<MigrationService>(MigrationService);
    blackjackService = module.get<BlackjackService>(BlackjackService);
  });

  it('should be defined', () => {
    expect(blackjackService).toBeDefined();
  });

  describe('blackjack methods', () => {
    it('should create a game', async () => {
      await migrationService.migrationData();
      const newGameResult = await blackjackService.newGame({ playerName: playerData.name, delay: playerData.delay });
      expect(newGameResult.messageType).not.toBeNull();
    }, 300000);
    it('should draw a card', async () => {
      const drawCardResult = await blackjackService.drawCard({ playerName: playerData.name, action: playerData.action });
      expect(drawCardResult.messageType).not.toBeNull();
    }, 300000);
    it('should return hand of players', async () => {
      const getHandResult = await blackjackService.getHand(playerData.name);
      expect(getHandResult.messageType).not.toBeNull();
    }, 300000);
  });
});
