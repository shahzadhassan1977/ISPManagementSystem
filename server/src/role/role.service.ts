import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Role } from '../auth/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from '../auth/entities/permission.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';

@Injectable()
export class RoleService {
    dataSource: any;
    constructor(
        @InjectRepository(Role) 
        private roleRepo: Repository<Role>,

        @InjectRepository(Permission) 
        private permissionRepo: Repository<Permission>,
        
        @InjectRepository(RolePermission) 
        private rolePermissionRepo: Repository<RolePermission>,
    ){}

    async create(createRoleDto: CreateRoleDto) {
          
        const role=this.roleRepo.create({
            name: createRoleDto.name,
            isActive: createRoleDto.isActive ?? true,
            isDeleted: createRoleDto.isDeleted ?? false,
          });
      
          return this.roleRepo.save(role);
    }
      
    async findAll() {
          return this.roleRepo.find({
            select: {
              roleid: true,
              name: true,
            },
            relations:[
             // 'userRoles',
             // 'userRoles.role',
             // 'userRoles.role.rolePermissions',
             // 'userRoles.role.rolePermissions.permission',              
              'rolePermissions',
              'rolePermissions.permission',
            ]
          });
    }
      
      
    async findOne(id: number) {
          const roleid = id ?? 0;
          const role = await this.roleRepo.findOne({
            where: {roleid},
            relations:[
              //'userRoles',
              //'userRoles.role',
              //'userRoles.role.rolePermissions',
              //'userRoles.role.rolePermissions.permission',
              'rolePermissions',
              'rolePermissions.permission',              
            ],
          });
      
          if (!role) {
            throw new NotFoundException('User not found');
          }
      
          return role;
    }      
      
      
    async update(id: number, dto: UpdateRoleDto) {
          const role = await this.findOne(id);
      
          if (dto.name) {
            const existing = await this.roleRepo.findOne({
              where: { name: dto.name },
            });
      
            if (existing && existing.roleid !== id) {
              throw new BadRequestException('Role already in use');
            }
            role.name = dto.name;
          }
          await this.roleRepo.save(role);
      
          return this.findOne(id);
    }
      
      
        // ✅ DELETE ROLE
    async remove(id: number) {
      
          const role = await this.findOne(id);
      
          await this.roleRepo.remove(role);
      
          return {
            message: 'Role deleted successfully',
          };
    }

    async assignPermissionToRole(roleId: number, permissionId: number) {
            const role = await this.roleRepo.findOne({
            where: { roleid: roleId } as FindOptionsWhere<Role>,
        });

        const permission = await this.permissionRepo.findOne({
            where: { permissionid: permissionId } as FindOptionsWhere<Permission>,
        });

        if (!role || !permission) {
            throw new Error('Role or Permission not found');
        }

        const rolePermission = this.rolePermissionRepo.create({
            role,
            permission,
        });

        const exists = await this.rolePermissionRepo.findOne({
            where: { role: { roleid: roleId } as FindOptionsWhere<Role>, permission: { permissionid: permissionId } as FindOptionsWhere<Permission> },
        });

        if (exists) return exists;

        return await this.rolePermissionRepo.save(rolePermission);
    }

   
    async assignMultiplePermissions(roleId: number, permissionIds: number[]) {
          // ✅ 1. Check role exists
          const role = await this.roleRepo.findOne({
            where: { roleid: roleId }, // ⚠️ use correct column name
          });

          if (!role) {
            throw new Error('Role not found');
          }

          // ✅ 2. DELETE OLD PERMISSIONS
          await this.rolePermissionRepo.delete({
            role: { roleid: roleId },
          });

          // ✅ 3. GET NEW PERMISSIONS
          const permissions = await this.permissionRepo.findBy({
            permissionid: In(permissionIds),
          });

          // ✅ 4. CREATE NEW RELATIONS
          const rolePermissions = permissions.map((permission) =>
            this.rolePermissionRepo.create({
              role,
              permission,
            }),
          );

          // ✅ 5. SAVE NEW
          return await this.rolePermissionRepo.save(rolePermissions);
        }

}
