import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { Subarea } from '../../subarea/entities/subarea.entity';

@Entity()
@Unique(['employee', 'subarea']) // ✅ prevent duplicate mapping
export class EmployeeSubarea {
  @PrimaryGeneratedColumn()
  id!: number;

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