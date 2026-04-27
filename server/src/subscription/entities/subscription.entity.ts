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
  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  renewalDate!: Date;

  // ✅ Billing
  @Column()
  billingCycle!: string; // Monthly / Weekly

  @Column()
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
}