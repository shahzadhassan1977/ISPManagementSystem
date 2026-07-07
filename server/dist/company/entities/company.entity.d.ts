import { Employee } from "../../employee/entities/employee.entity";
export declare class Company {
    companyid: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    cardRechargeURL?: string;
    employees: Employee[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    isActive: boolean;
    isDeleted: boolean;
    isOwner: boolean;
}
