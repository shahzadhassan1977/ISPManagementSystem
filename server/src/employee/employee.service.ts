import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Subarea } from '../subarea/entities/subarea.entity';
import { EmployeeSubarea } from '../employeesubarea/entities/employeesubarea.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    @InjectRepository(Subarea)
    private subareaRepo: Repository<Subarea>,
    @InjectRepository(EmployeeSubarea)
    private employeeSubareaRepo: Repository<EmployeeSubarea>,
  ) {}

  

  async create(createEmployeeDto: CreateEmployeeDto) {
    //console.log('Received DTO:', createEmployeeDto); // Debug log
    const emp = this.employeeRepo.create({
      email: createEmployeeDto.email,
      name: createEmployeeDto.name,
      phone: createEmployeeDto.phone,
      mobile: createEmployeeDto.mobile,
      designation: createEmployeeDto.designation,
      isActive: createEmployeeDto.isActive,
      isDeleted: createEmployeeDto.isDeleted,
      company: { companyid: createEmployeeDto.companyId },
    });

    return this.employeeRepo.save(emp);
  }

 
  async findAll() {
    return this.employeeRepo.find({
      select: {
        employeeid: true,
        name: true,
        email: true,
        phone: true,
        mobile: true,
        designation: true,
        isActive: true,
        isDeleted: true,
        createdAt: true,
      },
      relations: [
        'company',
        'employeeSubAreas',
        'employeeSubAreas.subarea',
        'employeeSubAreas.subarea.area',
      ],
    });
  }

  

  async findOne(id: number) {
    const employeeid = id ?? 0;
    const emp = await this.employeeRepo.findOne({
      where: { employeeid: employeeid },
      relations: [
        'company',
        'employeeSubAreas',
        'employeeSubAreas.subarea',
        'employeeSubAreas.subarea.area',
      ],
    });

    if (!emp) {
      throw new NotFoundException('Employee not found');
    }

    return emp;
  }

  findByCompany(companyId: number) {
    return this.employeeRepo.find({
      where: { company: { companyid: companyId } },
      relations: [
        'company',
        'employeeSubAreas',
        'employeeSubAreas.subarea',
        'employeeSubAreas.subarea.area',
      ],
    });
  }

  async findOneByEmail(email: string) {
    const emp = await this.employeeRepo.findOne({
      where: { email: email },
      relations: [
        'company',
        'employeeSubAreas',
        'employeeSubAreas.subarea',
        'employeeSubAreas.subarea.area',
      ],
    });

    if (!emp) {
      throw new NotFoundException('Employee not found');
    }

    return emp;
  }

  async update(employeeid: number, updateEmployeeDto: UpdateEmployeeDto) {
    console.log('Received DTO for update:', updateEmployeeDto); // Debug log
    const employee = await this.findOne(employeeid);

    if (updateEmployeeDto.email) {
      const existing = await this.employeeRepo.findOne({
        where: { email: updateEmployeeDto.email },
      });

      if (existing && existing.employeeid !== employeeid) {
        throw new BadRequestException('Email already in use');
      }
    }
    await this.employeeRepo.save({
      ...employee,
      ...updateEmployeeDto,      
    });

    return this.findOne(employeeid);
  }

  
  // ✅ DELETE EMPLOYEE
  async remove(employeeid: number) {
    const employee = await this.findOne(employeeid);

    await this.employeeRepo.remove(employee);

    return {
      message: 'Employee deleted successfully',
    };
  }

  async assignSubareaToEmployee(employeeId: number, subareaId: number) {
    const employee = await this.employeeRepo.findOne({
      where: { employeeid: employeeId } as FindOptionsWhere<Employee>,
    });

    const subarea = await this.subareaRepo.findOne({
      where: { subareaid: subareaId } as FindOptionsWhere<Subarea>,
    });

    if (!employee || !subarea) {
      throw new Error('Employee or Subarea not found');
    }

    const employeeSubarea = this.employeeSubareaRepo.create({
      employee,
      subarea,
    });

    const exists = await this.employeeSubareaRepo.findOne({
      where: {
        employee: { employeeid: employeeId } as FindOptionsWhere<Employee>,
        subarea: { subareaid: subareaId } as FindOptionsWhere<Subarea>,
      },
    });

    if (exists) return exists;

    return await this.employeeSubareaRepo.save(employeeSubarea);
  }

  async assignMultipleSubareas(employeeId: number, subareaIds: number[]) {
    // ✅ 1. Check employee exists
    const employee = await this.employeeRepo.findOne({
      where: { employeeid: employeeId }, // ⚠️ use correct column name
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    // ✅ 2. DELETE OLD SUBAREAS
    await this.employeeSubareaRepo.delete({
      employee: { employeeid: employeeId },
    });

    // ✅ 3. GET NEW SUBAREAS
    const subareas = await this.subareaRepo.findBy({
      subareaid: In(subareaIds),
    });

    // ✅ 4. CREATE NEW RELATIONS
    const employeeSubareas = subareas.map((subarea) =>
      this.employeeSubareaRepo.create({
        employee,
        subarea,
      }),
    );

    // ✅ 5. SAVE NEW
    return await this.employeeSubareaRepo.save(employeeSubareas);
  }
}
