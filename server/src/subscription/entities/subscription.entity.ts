import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Customer } from "../../customer/entities/customer.entity";
import { Product } from "../../product/entities/product.entity";
import { Subscriptiondetail } from "../../subscriptiondetail/entities/subscriptiondetail.entity";
import { Payment } from "../../payment/entities/payment.entity";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  subscriptionid!: number;

  // ✅ Dates
  @Column({ type: 'timestamp', nullable: true })
  startDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  renewalDate!: Date;

  // ✅ Billing
  @Column({ nullable: true })
  billingCycle!: string; // Monthly / Weekly

  @Column({ nullable: true })
  status!: string; // Active / Suspended / Cancelled

  // ✅ FK columns
  @Column()
  customerId!: number;

  @Column()
  productId!: number;

  // ✅ Relations
  @ManyToOne(() => Customer, (c) => c.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(() => Product, (p) => p.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @OneToMany(() => Subscriptiondetail, (sd) => sd.subscription)
  subscriptiondetails!: Subscriptiondetail[];

  @OneToMany(() => Payment, (p) => p.subscription)
  payments!: Payment[];

  @CreateDateColumn()
  createdAt!: Date;
    
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  createdBy!: number;
    
  @Column({ nullable: true })
  updatedBy!: number;

  @Column({ nullable: true })
  isActive!: boolean;
  
  @Column({ nullable: true })
  isDeleted!: boolean;
}