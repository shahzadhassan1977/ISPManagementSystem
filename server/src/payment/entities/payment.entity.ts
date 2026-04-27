import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  amount!: number;

  @Column('float', { nullable: true })
  otherAmount!: number;

  @Column({ unique: true })
  invoiceNumber!: string;

  @Column()
  billingMonth!: string;

  @Column()
  billingYear!: string;

  @Column()
  status!: string;

  @Column()
  customerId!: number;

  @Column()
  subscriptionId!: number;

  @ManyToOne(() => Customer, (c) => c.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(() => Subscription, (s) => s.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscriptionId' })
  subscription!: Subscription;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}