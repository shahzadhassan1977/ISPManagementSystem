//src/auth/entities/role.entity.ts
import { permission } from 'process';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from '../../user/entities/user.entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class AuthOTP {

    @PrimaryGeneratedColumn()
    authotpId!: number;

    @Column()
    email!: string;

    @Column()
    code!: string;

    @Column()
    isUsed!: boolean;

    @Column()
    expiresAt!: Date;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

}