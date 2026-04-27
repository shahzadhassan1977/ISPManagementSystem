import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portalsetting } from './entities/portalsetting.entity';
import { PortalsettingService } from './portalsetting.service';
import { PortalsettingController } from './portalsetting.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portalsetting])
  ],
  providers: [
    PortalsettingService
  ],
  controllers: [
    PortalsettingController
  ],
  exports:[
    PortalsettingService,
    TypeOrmModule
  ]
})
export class PortalsettingModule {}