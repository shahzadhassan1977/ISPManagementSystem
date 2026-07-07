import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ApiLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  method!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  userId?: string;
  
  @Column({ nullable: true })
  userEmail?: string;

  @Column({ nullable: true })
  ip?: string;

  @Column({ type: 'json', nullable: true })
  requestBody?: any;

  @Column({ type: 'json', nullable: true })
  responseBody?: any;

  @Column({ nullable: true })
  statusCode?: number;

  @Column({ nullable: true })
  duration?: number;

  @Column({ nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @Column({ default: 0 })
    createdBy!: number;
      
    @Column({ default: 0 })
    updatedBy!: number;
}