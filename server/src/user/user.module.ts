import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';
import { UserRole } from '../auth/entities/user-role.entity';
import { Role } from '../auth/entities/role.entity';
import { Permission } from '../auth/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role,Permission,RolePermission,UserRole])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService, TypeOrmModule],
})
export class UserModule {}
