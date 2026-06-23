import { Module } from '@nestjs/common';
import { SheetController } from './sheet.controller';
import { SheetService } from './sheet.service';
import { DiceRollsModule } from './dice-rolls/dice-rolls.module';
import { StatusesModule } from './statuses/statuses.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { SettingsModule } from './settings/settings.module';
import { ResourcesModule } from './resources/resources.module';
import { MarkersModule } from './markers/markers.module';
import { AttributesModule } from './attributes/attributes.module';
import { SkillsModule } from './skills/skills.module';
import { NotesModule } from './notes/notes.module';

@Module({
  controllers: [SheetController],
  providers: [SheetService],
  imports: [DiceRollsModule, StatusesModule, AbilitiesModule, SettingsModule, ResourcesModule, MarkersModule, AttributesModule, SkillsModule, NotesModule]
})
export class SheetModule {}
