import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { Subarea } from '../../subarea/entities/subarea.entity';

@Entity()
@Unique(['employee', 'subarea']) // ✅ prevent duplicate mapping
export class EmployeeSubarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
  
  @Column({ default: 0 })
  createdBy!: number;
      
  @Column({ default: 0 })
  updatedBy!: number;

  @ManyToOne(() => Employee, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employeeId' })
  employee!: Employee;

  @ManyToOne(() => Subarea, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subareaId' })
  subarea!: Subarea;
}