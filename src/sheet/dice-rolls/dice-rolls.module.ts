import { Module } from '@nestjs/common';
import { DiceRollsController } from './dice-rolls.controller';
import { DiceRollsService } from './dice-rolls.service';

@Module({
  controllers: [DiceRollsController],
  providers: [DiceRollsService]
})
export class DiceRollsModule {}
