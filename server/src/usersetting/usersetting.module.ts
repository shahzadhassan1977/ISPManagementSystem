import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usersetting } from './entities/usersetting.entity';
import { UsersettingController } from './usersetting.controller';
import { UsersettingService } from './usersetting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usersetting])
  ],
  providers: [
    UsersettingService
  ],
  controllers: [
    UsersettingController
  ],
  exports:[
    UsersettingService,
    TypeOrmModule
  ]
})
export class UsersettingModule {}