"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const typeorm_2 = require("typeorm");
const subarea_entity_1 = require("../subarea/entities/subarea.entity");
const employeesubarea_entity_1 = require("../employeesubarea/entities/employeesubarea.entity");
let EmployeeService = class EmployeeService {
    employeeRepo;
    subareaRepo;
    employeeSubareaRepo;
    constructor(employeeRepo, subareaRepo, employeeSubareaRepo) {
        this.employeeRepo = employeeRepo;
        this.subareaRepo = subareaRepo;
        this.employeeSubareaRepo = employeeSubareaRepo;
    }
    async create(createEmployeeDto) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Employee not found');
        }
        return emp;
    }
    findByCompany(companyId) {
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
    async findOneByEmail(email) {
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
            throw new common_1.NotFoundException('Employee not found');
        }
        return emp;
    }
    async update(employeeid, updateEmployeeDto) {
        console.log('Received DTO for update:', updateEmployeeDto);
        const employee = await this.findOne(employeeid);
        if (updateEmployeeDto.email) {
            const existing = await this.employeeRepo.findOne({
                where: { email: updateEmployeeDto.email },
            });
            if (existing && existing.employeeid !== employeeid) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
        await this.employeeRepo.save({
            ...employee,
            ...updateEmployeeDto,
        });
        return this.findOne(employeeid);
    }
    async remove(employeeid) {
        const employee = await this.findOne(employeeid);
        await this.employeeRepo.remove(employee);
        return {
            message: 'Employee deleted successfully',
        };
    }
    async assignSubareaToEmployee(employeeId, subareaId) {
        const employee = await this.employeeRepo.findOne({
            where: { employeeid: employeeId },
        });
        const subarea = await this.subareaRepo.findOne({
            where: { subareaid: subareaId },
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
                employee: { employeeid: employeeId },
                subarea: { subareaid: subareaId },
            },
        });
        if (exists)
            return exists;
        return await this.employeeSubareaRepo.save(employeeSubarea);
    }
    async assignMultipleSubareas(employeeId, subareaIds) {
        const employee = await this.employeeRepo.findOne({
            where: { employeeid: employeeId },
        });
        if (!employee) {
            throw new Error('Employee not found');
        }
        await this.employeeSubareaRepo.delete({
            employee: { employeeid: employeeId },
        });
        const subareas = await this.subareaRepo.findBy({
            subareaid: (0, typeorm_2.In)(subareaIds),
        });
        const employeeSubareas = subareas.map((subarea) => this.employeeSubareaRepo.create({
            employee,
            subarea,
        }));
        return await this.employeeSubareaRepo.save(employeeSubareas);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(subarea_entity_1.Subarea)),
    __param(2, (0, typeorm_1.InjectRepository)(employeesubarea_entity_1.EmployeeSubarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map