//src/auth/entities/user-role.entity.ts
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
    id!: number;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}