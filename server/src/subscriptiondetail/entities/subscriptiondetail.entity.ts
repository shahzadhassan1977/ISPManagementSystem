import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity()
export class Subscriptiondetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp' })
  installationDate!: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  installationCharges!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  wireCharges!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  deviceCharges!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  splitterCharges!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  fee!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  otherCharges!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  paid!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  remainingBalance!: number;

  @Column()
  deviceMac!: string;

  @Column()
  userId!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  staticIP!: string;

  @Column()
  olt!: string;

  @Column()
  oltPort!: string;

  @Column()
  splitter!: string;

  @Column()
  splitterPort!: string;

  // ✅ FK column (IMPORTANT)
  @Column()
  subscriptionId!: number;

  @ManyToOne(() => Subscription, (s) => s.subscriptiondetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscriptionId' })
  subscription!: Subscription;

  @Column()
  linemanId!: number;

  @Column()
  areaRecoveryOfficerId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}