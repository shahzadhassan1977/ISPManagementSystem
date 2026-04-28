import { Company } from "../../company/entities/company.entity";
import { EmployeeSubarea } from "../../employeesubarea/entities/employeesubarea.entity";
export declare class Employee {
    employeeid: number | undefined;
    name: string | undefined;
    phone: string;
    email: string | undefined;
    mobile: string;
    designation: string;
    isActive: boolean;
    isDeleted: boolean;
    companyId: number;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
    employeeSubAreas: EmployeeSubarea[];
}
