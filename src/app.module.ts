import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { CampaignModule } from './campaign/campaign.module';
import { SheetModule } from './sheet/sheet.module';
import { SheetModule } from './sheet/sheet.module';

@Module({
  imports: [UserModule, DatabaseModule, ConfigModule.forRoot({
      isGlobal: true, // permite usar ConfigService em qualquer módulo sem reimportar
    }), CampaignModule, SheetModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
