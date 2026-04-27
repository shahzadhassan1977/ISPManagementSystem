//src/auth/entities/role.entity.ts
import { permission } from 'process';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

     // ✅ Role → Users
    @OneToMany(() => UserRole, (ur) => ur.role)
     userRoles!: UserRole[];

    // ✅ Role → Permissions
    @OneToMany(() => RolePermission, (rp) => rp.role)
    rolePermissions!: RolePermission[];

}