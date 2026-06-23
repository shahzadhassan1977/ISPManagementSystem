import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EmailConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  smtpHost!: string;

  @Column('int')
  smtpPort!: number;

  @Column()
  smtpUser!: string;

  @Column()
  smtpPassword!: string;

  @Column('boolean', { default: false })
  smtpSecure!: boolean;

  @Column()
  fromAddress!: string;

  @Column({ nullable: true })
  fromName?: string;

  @Column({ nullable: true })
  subjectTemplate?: string;

  @Column({ type: 'text', nullable: true })
  bodyTemplate?: string;

  @Column('boolean', { default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
