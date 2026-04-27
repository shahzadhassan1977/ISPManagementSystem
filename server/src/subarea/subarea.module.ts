import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subarea } from './entities/subarea.entity';
import { SubareaController } from './subarea.controller';
import { SubareaService } from './subarea.service';
import { AreaModule } from '../area/area.module';
import { Area } from '../area/entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subarea, Area]),
  AreaModule,
  ],
  controllers: [SubareaController],
  providers: [SubareaService],
  exports:[SubareaService, TypeOrmModule],
})
export class SubareaModule {}
