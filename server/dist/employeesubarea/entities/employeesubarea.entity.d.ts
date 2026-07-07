import { Employee } from '../../employee/entities/employee.entity';
import { Subarea } from '../../subarea/entities/subarea.entity';
export declare class EmployeeSubarea {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    employee: Employee;
    subarea: Subarea;
}
