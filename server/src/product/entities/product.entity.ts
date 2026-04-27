import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Productdetail } from "../../productdetail/entities/productdetail.entity";
import { Subscription } from "../../subscription/entities/subscription.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productid!: number;

  @Column({ unique: true })
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salePrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice!: number;

  @OneToMany(() => Productdetail, (pd) => pd.product)
  productdetails!: Productdetail[];

  @OneToMany(() => Subscription, (s) => s.product)
  subscriptions!: Subscription[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}