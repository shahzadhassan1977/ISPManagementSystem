import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from '../auth/entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
     constructor(
            @InjectRepository(Permission) 
            private permissionRepo: Repository<Permission>
          ){}
    
           async create(createPermissionDto: CreatePermissionDto) {
              
            const permission=this.permissionRepo.create({
                name: createPermissionDto.name,
                isActive: createPermissionDto.isActive ?? true,
                isDeleted: createPermissionDto.isDeleted ?? false,
              });
          
              return this.permissionRepo.save(permission);
            }
          
            async findAll() {
              return this.permissionRepo.find({
                select: {
                  permissionid: true,
                  name: true,
                },
                relations:[
                  'rolePermissions',
                  'rolePermissions.permission',
                ],
              });
            }
          
          
             async findOne(id: number) {
              const permissionid = id ?? 0;
              const permission = await this.permissionRepo.findOne({
                where: {permissionid},
                relations:[
                  'rolePermissions',
                  'rolePermissions.permission',
                ],
              });
          
              if (!permission) {
                throw new NotFoundException('Permission not found');
              }
          
              return permission;
            }      
          
          
            async update(id: number, dto: UpdatePermissionDto) {
              const permission = await this.findOne(id);
          
              if (dto.name) {
                const existing = await this.permissionRepo.findOne({
                  where: { name: dto.name },
                });
          
                if (existing && existing.permissionid !== id) {
                  throw new BadRequestException('Permission already in use');
                }
                permission.name = dto.name;
              }

              if (dto.isActive !== undefined) {
                permission.isActive = dto.isActive;
              }

              if (dto.isDeleted !== undefined) {
                permission.isDeleted = dto.isDeleted;
              }

              await this.permissionRepo.save(permission);
          
              return this.findOne(id);
            }
          
          
            // ✅ DELETE USER
            async remove(id: number) {
          
              const permission = await this.findOne(id);
          
              await this.permissionRepo.remove(permission);
          
              return {
                message: 'Permission deleted successfully',
              };
            }
}
