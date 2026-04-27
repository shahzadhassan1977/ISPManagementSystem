import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from '../auth/entities/role-permission.entity';
import { UserRole } from '../auth/entities/user-role.entity';
import { Role } from '../auth/entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Permission } from '../auth/entities/permission.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role,Permission,RolePermission,UserRole]),
  PermissionModule
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports:[RoleService, TypeOrmModule],
})
export class RoleModule {}
