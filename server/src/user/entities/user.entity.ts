import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Role } from "../../auth/entities/role.entity";
import { UserRole } from "../../auth/entities/user-role.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()    
    userid: number | undefined;    

    @Column({ type: 'varchar', nullable: true })
    name: string | undefined;

    @Column({ unique: true, type: 'varchar', nullable: true })
    email: string | undefined;
    
    @Column({ type: 'varchar', nullable: true })
    password: string | undefined;

    // Optional flags (production ready)
    @Column({ default: true })
    isActive!: boolean;

    @Column({ default: false })
    isDeleted!: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    // ✅ User → UserRole (Many roles)
    @OneToMany(() => UserRole, (ur) => ur.user)
    userRoles!: UserRole[];

}
