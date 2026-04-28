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
exports.AreaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const area_entity_1 = require("./entities/area.entity");
let AreaService = class AreaService {
    areaRepo;
    constructor(areaRepo) {
        this.areaRepo = areaRepo;
    }
    async create(dto) {
        const exists = await this.areaRepo.findOne({
            where: { name: dto.name },
        });
        if (exists) {
            throw new common_1.BadRequestException('Area already exists');
        }
        const area = this.areaRepo.create(dto);
        return this.areaRepo.save(area);
    }
    async findAll() {
        return this.areaRepo.find({
            relations: ['subAreas'],
            order: { areaid: 'DESC' },
        });
    }
    async findOne(id) {
        const area = await this.areaRepo.findOne({
            where: { areaid: id },
            relations: ['subAreas'],
        });
        if (!area) {
            throw new common_1.NotFoundException('Area not found');
        }
        return area;
    }
    async update(id, dto) {
        const area = await this.findOne(id);
        if (dto.name && dto.name !== area.name) {
            const exists = await this.areaRepo.findOne({
                where: { name: dto.name },
            });
            if (exists) {
                throw new common_1.BadRequestException('Area name already exists');
            }
        }
        Object.assign(area, dto);
        return this.areaRepo.save(area);
    }
    async remove(id) {
        const area = await this.findOne(id);
        await this.areaRepo.remove(area);
        return {
            message: 'Area deleted successfully',
        };
    }
};
exports.AreaService = AreaService;
exports.AreaService = AreaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AreaService);
//# sourceMappingURL=area.service.js.map