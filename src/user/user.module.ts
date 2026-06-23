import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
})
export class UserModule {}
