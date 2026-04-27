//src/auth/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
    permissionid!: number;

  @Column({ unique: true })
    name!: string;

    // ✅ Permission → Roles
  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions!: RolePermission[];
}