import { Employee } from "../../employee/entities/employee.entity";
export declare class Company {
    companyid: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    employees: Employee[];
    createdAt: Date;
    updatedAt: Date;
}
