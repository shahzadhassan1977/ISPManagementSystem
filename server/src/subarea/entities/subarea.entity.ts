import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Area } from "../../area/entities/area.entity";
import { EmployeeSubarea } from "../../employeesubarea/entities/employeesubarea.entity";

@Entity()
@Unique(['name', 'area'])
export class Subarea {
  @PrimaryGeneratedColumn()
  subareaid!: number;

  @Column()
  name!: string;

  @Column()
  areaId!: number; // ✅ helpful for queries

  @ManyToOne(() => Area, (a) => a.subAreas, {
    onDelete: 'CASCADE',
  })
  
  @JoinColumn({ name: 'areaId' })
  area!: Area;

  @OneToMany(() => EmployeeSubarea, (esa) => esa.subarea)
  employees!: EmployeeSubarea[];
}