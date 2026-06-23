import { Test, TestingModule } from '@nestjs/testing';
import { DiceRollsService } from './dice-rolls.service';

describe('DiceRollsService', () => {
  let service: DiceRollsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiceRollsService],
    }).compile();

    service = module.get<DiceRollsService>(DiceRollsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
