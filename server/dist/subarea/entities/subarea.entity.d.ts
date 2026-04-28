import { Area } from "../../area/entities/area.entity";
import { EmployeeSubarea } from "../../employeesubarea/entities/employeesubarea.entity";
export declare class Subarea {
    subareaid: number;
    name: string;
    areaId: number;
    area: Area;
    employees: EmployeeSubarea[];
}
