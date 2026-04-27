import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from '../auth/entities/role-permission.entity';
import { Area } from './entities/area.entity';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';

@Module({
   imports: [
    TypeOrmModule.forFeature([Area]), // ✅ REQUIRED
  ],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService, TypeOrmModule], // ✅ IMPORTANT if used elsewhere
})
export class AreaModule {}

