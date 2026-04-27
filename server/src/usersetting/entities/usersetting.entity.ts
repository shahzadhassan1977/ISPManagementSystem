import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usersetting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  keyName!: string;

  @Column()
  keyValue!: string;

  @Column()
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}