import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class CommunicationLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  channel!: string;

  @Column()
  eventType!: string;

  @Column()
  recipient!: string;

  @Column({ nullable: true })
  subject?: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ nullable: true })
  errorMessage?: string;

  @Column({ nullable: true })
  relatedTable?: string;

  @Column({ nullable: true })
  relatedId?: number;

  @Column({ type: 'json', nullable: true })
  payload?: any;

  @CreateDateColumn()
  createdAt!: Date;
}
