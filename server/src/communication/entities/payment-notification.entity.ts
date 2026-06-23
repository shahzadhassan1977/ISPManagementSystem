import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PaymentNotification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  paymentId!: number;

  @Column()
  customerId!: number;

  @Column()
  channel!: string;

  @Column()
  eventType!: string;

  @Column({ nullable: true })
  templateName?: string;

  @Column({ nullable: true })
  recipient?: string;

  @Column({ nullable: true })
  subject?: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'json', nullable: true })
  payload?: any;

  @Column({ default: 'pending' })
  status!: string;

  @Column('boolean', { default: false })
  isSent!: boolean;

  @Column({ type: 'datetime', nullable: true })
  sentAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
