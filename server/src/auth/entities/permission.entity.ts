//src/auth/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  permissionid!: number;

  @Column({ unique: true })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;
    
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: true })
  isActive!: boolean;
  
  @Column({ default: false })
  isDeleted!: boolean;

  // ✅ Permission → Roles
  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions!: RolePermission[];
}