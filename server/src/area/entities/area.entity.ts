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

  @CreateDateColumn({ nullable: true })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date;

  @Column({ nullable: true })
  createdBy!: number;
    
  @Column({ nullable: true })
  updatedBy!: number;

  @Column({ nullable: true })
  isActive!: boolean;
  
  @Column({ nullable: true })
  isDeleted!: boolean;

  @OneToMany(() => Subarea, (s) => s.area, {
    cascade: true,
  })
  subAreas!: Subarea[];
}