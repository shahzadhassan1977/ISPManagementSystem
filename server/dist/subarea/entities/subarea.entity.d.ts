import { Area } from "../../area/entities/area.entity";
import { EmployeeSubarea } from "../../employeesubarea/entities/employeesubarea.entity";
export declare class Subarea {
    subareaid: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    isActive: boolean;
    isDeleted: boolean;
    areaId: number;
    area: Area;
    employees: EmployeeSubarea[];
}
