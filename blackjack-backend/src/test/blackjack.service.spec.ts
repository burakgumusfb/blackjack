/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SchemaModule } from '@app/schemas/schema.module';
import { CustomConfigModule } from '@app/config/custom-config.module';
import { MigrationService } from '@app/modules/migration/migration.service';
import { BlackjackService } from '@app/modules/blackjack/services/blackjack.service';
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
