import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customerid!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  cnic!: string;

  @Column({ nullable: true })
  mobile!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  isActive!: boolean;

  @Column()
  isDeleted!: boolean;

  @OneToMany(() => Subscription, (s) => s.customer)
  subscriptions!: Subscription[];

  @OneToMany(() => Payment, (p) => p.customer)
  payments!: Payment[];

  @CreateDateColumn()
  createdAt!: Date;
    
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  createdBy!: number;
    
  @Column()
  updatedBy!: number;
}