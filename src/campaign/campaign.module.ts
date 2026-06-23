import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Campaign } from './models/campaign.model';

@Module({
    imports: [SequelizeModule.forFeature([Campaign])],
    exports: [SequelizeModule],
})
export class CampaignModule {}
