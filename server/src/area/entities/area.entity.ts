import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subarea } from '../../subarea/entities/subarea.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  areaid!: number;

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

  @OneToMany(() => Subarea, (s) => s.area, {
    cascade: true,
  })
  subAreas!: Subarea[];
}