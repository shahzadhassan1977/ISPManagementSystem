import { EmployeeSubarea } from './entities/employeesubarea.entity';
import { Repository } from 'typeorm';
export declare class EmployeeSubareaService {
    private repo;
    constructor(repo: Repository<EmployeeSubarea>);
    create(dto: any): Promise<EmployeeSubarea>;
    findAll(): Promise<EmployeeSubarea[]>;
    findOne(id: number): Promise<EmployeeSubarea | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByEmployee(employeeId: number): Promise<EmployeeSubarea[]>;
    findBySubArea(subareaId: number): Promise<EmployeeSubarea[]>;
}
