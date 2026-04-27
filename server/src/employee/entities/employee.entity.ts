import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { EmployeeSubarea } from "../../employeesubarea/entities/employeesubarea.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employeeid!: number | undefined;

  @Column({ type: 'varchar', nullable: true })
  name!: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  phone!: string;

  @Column({ unique: true, type: 'varchar', nullable: true })
  email!: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  mobile!: string;

  @Column({ type: 'varchar', nullable: true })
  designation!: string;

  // Optional flags (production ready)
  @Column({ default: true })
  isActive!: boolean;
  
  @Column({ default: false })
  isDeleted!: boolean;

  @Column()
  companyId!: number;

  @ManyToOne(() => Company, (c) => c.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company!: Company;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => EmployeeSubarea, (esa) => esa.employee)
  employeeSubAreas!: EmployeeSubarea[];
}