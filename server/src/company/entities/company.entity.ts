import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  companyid!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Employee, (e) => e.company, {
    cascade: true,
  })
  employees!: Employee[];

  @CreateDateColumn()
  createdAt!: Date;
    
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  isActive!: boolean;
  
  @Column()
  isDeleted!: boolean;

  @Column()
  isOwner!: boolean;
}