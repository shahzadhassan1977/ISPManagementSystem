//src/auth/entities/role.entity.ts
import { permission } from 'process';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from '../../user/entities/user.entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
    roleid!: number;

  @Column({ unique: true })
    name!: string;

  @CreateDateColumn()
    createdAt!: Date;
      
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @Column()
    isActive!: boolean;
    
    @Column()
    isDeleted!: boolean;

     // ✅ Role → Users
    @OneToMany(() => UserRole, (ur) => ur.role)
     userRoles!: UserRole[];

    // ✅ Role → Permissions
    @OneToMany(() => RolePermission, (rp) => rp.role)
    rolePermissions!: RolePermission[];

}