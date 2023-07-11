/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from '@modules/player/player.service';
import { SchemaModule } from '@app/schemas/schema.module';
import { CustomConfigModule } from '@app/config/custom-config.module';

describe('PlayerService', () => {
  let playerService: PlayerService;
  const player = {
    name: 'test',
    delay: 5,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SchemaModule, CustomConfigModule],
      providers: [PlayerService],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(playerService).toBeDefined();
  });

  describe('player methods', () => {
    it('should create a player', async () => {
      const result = await playerService.createPlayer(player.name, player.delay);
      expect(result.name).toBe(player.name);
    });
    it('should return a player', async () => {
      const result = await playerService.getPlayer(player.name);
      expect(result.name).toBe(player.name);
    });
    it('should set status of player', async () => {
      const result = await playerService.setGameStatus(player.name, true);
      expect(result.hasGame).toBe(1);
    });
  });

  describe('dealer methods', () => {
    it('should create a dealer', async () => {
      const result = await playerService.createDealer();
      expect(result.name).toBe('dealer');
    });
    it('should return a dealer', async () => {
      const result = await playerService.getDealer();
      expect(result.name).toBe('dealer');
    });
  });

});
