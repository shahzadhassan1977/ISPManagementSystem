import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ChangeLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  table_name!: string;

  @Column()
  action!: string;

  @Column({ nullable: true })
  row_id?: number;
  
  @Column({ nullable: true, type: 'json' })
  old_value?: string;

  @Column({ nullable: true, type: 'json' })
  new_value?: string;

  @CreateDateColumn()
  changed_at!: Date;

  @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @Column()
    createdBy!: number;
      
    @Column()
    updatedBy!: number;
}