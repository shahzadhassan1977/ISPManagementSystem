import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/entities/role.entity';
import { UserRole } from '../auth/entities/user-role.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepo: Repository<UserRole>,    
  ){}

  async create(createUserDto: CreateUserDto) {
    const userpassword=createUserDto.password??'';
    const hashed=await bcrypt.hash(userpassword, 10);

    const user=this.userRepo.create({
      email: createUserDto.email,
      password: hashed,
      name: createUserDto.name,
      isActive: createUserDto.isActive,
      isDeleted: createUserDto.isDeleted,
      createdAt: createUserDto.createdAt,
    });

    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find({
      select: {
        userid: true,
        email: true,
        name: true,
        isActive: true,
        isDeleted: true,
        createdAt: true,
      },
      relations:[
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }


   async findOne(id: number) {
    const userid = id ?? 0;
    const user = await this.userRepo.findOne({
      where: { userid },
      relations:[
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({
     where: { email: email },
     relations:[
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    }
  )

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }


  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (dto.email) {
      const existing = await this.userRepo.findOne({
        where: { email: dto.email },
      });

      if (existing && existing.userid !== id) {
        throw new BadRequestException('Email already in use');
      }

      user.email = dto.email;
      user.name = dto.name;
      user.isActive = dto.isActive;
      user.isDeleted = dto.isDeleted;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    await this.userRepo.save(user);

    // 🔁 update roles
    // if (dto.roleIds) {
    //   // remove old roles
    //   await this.userRoleRepo.delete({ user: { id } });

    //   const roles = await this.roleRepo.find({
    //     where: { id: In(dto.roleIds) },
    //   });

    //   const newUserRoles = roles.map((role) =>
    //     this.userRoleRepo.create({ user, role }),
    //   );

    //   await this.userRoleRepo.save(newUserRoles);
    // }

    return this.findOne(id);
  }


  // ✅ DELETE USER
  async remove(id: number) {

    const user = await this.findOne(id);

    await this.userRepo.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }

  async assignRoleToUser(userId: number, roleId: number) {
              const user = await this.userRepo.findOne({
              where: { userid: userId } as FindOptionsWhere<User>,
          });
  
          const role = await this.roleRepo.findOne({
              where: { roleid: roleId } as FindOptionsWhere<Role>,
          });
  
          if (!user || !role) {
              throw new Error('User or Role not found');
          }
  
          const userRole = this.userRoleRepo.create({
              user,
              role,
          });
  
          const exists = await this.userRoleRepo.findOne({
              where: { user: { userid: userId } as FindOptionsWhere<User>, role: { roleid: roleId } as FindOptionsWhere<Role> },
          });
  
          if (exists) return exists;
  
          return await this.userRoleRepo.save(userRole);
  }
  
     
  async assignMultipleRoles(userId: number, roleIds: number[]) {
            // ✅ 1. Check user exists
            const user = await this.userRepo.findOne({
              where: { userid: userId }, // ⚠️ use correct column name
            });
  
            if (!user) {
              throw new Error('User not found');
            }
  
            // ✅ 2. DELETE OLD ROLES
            await this.userRoleRepo.delete({
              user: { userid: userId },
            });
  
            // ✅ 3. GET NEW ROLES
            const roles = await this.roleRepo.findBy({
              roleid: In(roleIds),
            });
  
            // ✅ 4. CREATE NEW RELATIONS
            const userRoles = roles.map((role) =>
              this.userRoleRepo.create({
                user,
                role,
              }),
            );
  
            // ✅ 5. SAVE NEW
            return await this.userRoleRepo.save(userRoles);
  }

  
}
