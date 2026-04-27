import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from '../auth/entities/role-permission.entity';
import { Permission } from '../auth/entities/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission,RolePermission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports:[PermissionService, TypeOrmModule],
})
export class PermissionModule {}
