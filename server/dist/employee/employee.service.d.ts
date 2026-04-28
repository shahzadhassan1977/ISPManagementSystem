import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Subarea } from '../subarea/entities/subarea.entity';
import { EmployeeSubarea } from '../employeesubarea/entities/employeesubarea.entity';
export declare class EmployeeService {
    private employeeRepo;
    private subareaRepo;
    private employeeSubareaRepo;
    constructor(employeeRepo: Repository<Employee>, subareaRepo: Repository<Subarea>, employeeSubareaRepo: Repository<EmployeeSubarea>);
    create(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    findByCompany(companyId: number): Promise<Employee[]>;
    findOneByEmail(email: string): Promise<Employee>;
    update(employeeid: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    remove(employeeid: number): Promise<{
        message: string;
    }>;
    assignSubareaToEmployee(employeeId: number, subareaId: number): Promise<EmployeeSubarea>;
    assignMultipleSubareas(employeeId: number, subareaIds: number[]): Promise<EmployeeSubarea[]>;
}
