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
exports.EmployeeSubareaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employeesubarea_entity_1 = require("./entities/employeesubarea.entity");
const typeorm_2 = require("typeorm");
let EmployeeSubareaService = class EmployeeSubareaService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const exists = await this.repo.findOne({
            where: {
                employee: { employeeid: dto.employeeId },
                subarea: { subareaid: dto.subareaId },
            },
        });
        if (exists) {
            throw new common_1.BadRequestException('Mapping already exists');
        }
        const entity = this.repo.create({
            employee: { employeeid: dto.employeeId },
            subarea: { subareaid: dto.subareaId },
        });
        return this.repo.save(entity);
    }
    findAll() {
        return this.repo.find({
            relations: ['employee', 'subarea'],
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['employee', 'subarea'],
        });
    }
    remove(id) {
        return this.repo.delete(id);
    }
    findByEmployee(employeeId) {
        return this.repo.find({
            where: { employee: { employeeid: employeeId } },
            relations: ['subarea'],
        });
    }
    findBySubArea(subareaId) {
        return this.repo.find({
            where: { subarea: { subareaid: subareaId } },
            relations: ['employee'],
        });
    }
};
exports.EmployeeSubareaService = EmployeeSubareaService;
exports.EmployeeSubareaService = EmployeeSubareaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employeesubarea_entity_1.EmployeeSubarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeSubareaService);
//# sourceMappingURL=employeesubarea.service.js.map