import { Test, TestingModule } from '@nestjs/testing';
import { HandService } from './hand.service';

describe('HandService', () => {
  let service: HandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandService],
    }).compile();

    service = module.get<HandService>(HandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
