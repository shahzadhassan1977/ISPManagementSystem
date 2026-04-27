import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Portalsetting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  keyName!: string;

  @Column()
  keyValue!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}