import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SmsConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  provider!: string;

  @Column({ nullable: true })
  apiKey?: string;

  @Column({ nullable: true })
  apiSecret?: string;

  @Column({ nullable: true })
  senderId?: string;

  @Column('boolean', { default: false })
  whatsappEnabled!: boolean;

  @Column({ nullable: true })
  whatsappNumber?: string;

  @Column({ type: 'text', nullable: true })
  smsTemplate?: string;

  @Column({ type: 'text', nullable: true })
  whatsappTemplate?: string;

  @Column('boolean', { default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
