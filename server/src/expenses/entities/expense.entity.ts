import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("expenses")
export class Expense {
    @PrimaryGeneratedColumn()
    id!: number;  

    @Column({ length: 100 })
    title!: string;

    @Column()
    month!: string;

    @Column()
    year!: string;

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2,
    })
    amount!: number;

    @Column({
        type: "date",
    })
    expenseDate!: Date;

    @Column({
        nullable: true,
        length: 500,
    })
    description!: string;

    @Column({
        length: 50,
    })
    category!: string;

    @Column({
        nullable: true,
        length: 100,
    })
    paymentMethod!: string;

    @Column({
        default: true,
    })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;    
    
    @Column()
    createdBy!: number;

    @Column()
    updatedBy!: number;

    @Column()
    branchId!: number;
    
    @Column()
    vendorId!: number;
    
    @Column()
    employeeId!: number;
    
    @Column()
    invoiceNo!: string;

    @Column()
    attachment!: string;

    @Column()
    approvedBy!: number;

    @Column()
    status!: string;
}
