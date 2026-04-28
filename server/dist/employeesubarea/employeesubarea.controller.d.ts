import { EmployeeSubareaService } from './employeesubarea.service';
import { CreateEmployeeSubareaDto } from './dto/create-employeesubarea.dto';
export declare class EmployeeSubareaController {
    private service;
    constructor(service: EmployeeSubareaService);
    create(dto: CreateEmployeeSubareaDto): Promise<import("./entities/employeesubarea.entity").EmployeeSubarea>;
    findAll(employeeId?: number, subareaId?: number): Promise<import("./entities/employeesubarea.entity").EmployeeSubarea[]>;
    findOne(id: number): Promise<import("./entities/employeesubarea.entity").EmployeeSubarea | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
