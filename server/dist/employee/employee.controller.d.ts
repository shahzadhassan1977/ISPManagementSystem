import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { SearchEmployeeDto } from './dto/search-employee.dto';
import { AssignSubareaDto } from './dto/assign-subarea.dto';
export declare class EmployeeController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<import("./entities/employee.entity").Employee> | undefined;
    findAll(): Promise<import("./entities/employee.entity").Employee[]> | undefined;
    findOne(employeeid: string): Promise<import("./entities/employee.entity").Employee> | undefined;
    findOneByEmail(searchEmployeeDto: SearchEmployeeDto): Promise<import("./entities/employee.entity").Employee> | undefined;
    findByCompany(companyId: string): Promise<import("./entities/employee.entity").Employee[]> | undefined;
    update(employeeid: string, updateEmployeeDto: UpdateEmployeeDto): Promise<import("./entities/employee.entity").Employee> | undefined;
    remove(id: string): Promise<{
        message: string;
    }> | undefined;
    assignSubarea(assignSubareaDto: AssignSubareaDto): Promise<import("../employeesubarea/entities/employeesubarea.entity").EmployeeSubarea[]>;
}
