import { Test, TestingModule } from '@nestjs/testing';
import { DiceRollsController } from './dice-rolls.controller';

describe('DiceRollsController', () => {
  let controller: DiceRollsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiceRollsController],
    }).compile();

    controller = module.get<DiceRollsController>(DiceRollsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
