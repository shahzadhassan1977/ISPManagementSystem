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
exports.SubareaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subarea_entity_1 = require("./entities/subarea.entity");
const area_entity_1 = require("../area/entities/area.entity");
let SubareaService = class SubareaService {
    subareaRepo;
    areaRepo;
    constructor(subareaRepo, areaRepo) {
        this.subareaRepo = subareaRepo;
        this.areaRepo = areaRepo;
    }
    async create(createSubareaDto) {
        const subarea = this.subareaRepo.create({
            name: createSubareaDto.name,
            area: { areaid: createSubareaDto.areaId },
        });
        return this.subareaRepo.save(subarea);
    }
    async findAll() {
        return this.subareaRepo.find({
            select: {
                subareaid: true,
                name: true,
                areaId: true,
            },
            relations: ['area'],
        });
    }
    async findOne(id) {
        const subareaid = id ?? 0;
        const subarea = await this.subareaRepo.findOne({
            where: { subareaid },
            relations: ['area'],
        });
        if (!subarea) {
            throw new common_1.NotFoundException('Subarea not found');
        }
        return subarea;
    }
    findByArea(areaId) {
        return this.subareaRepo.find({
            where: { area: { areaid: areaId } },
        });
    }
    async update(id, dto) {
        const subArea = await this.findOne(id);
        if (subArea?.name === dto.name && subArea?.area.areaid === dto.areaId) {
            return subArea;
        }
        else if (subArea) {
            subArea.name = dto.name;
            subArea.area = { areaid: dto.areaId };
            return this.subareaRepo.save(subArea);
        }
        else {
            throw new Error('Subarea not found');
        }
    }
    async remove(id) {
        const subarea = await this.findOne(id);
        await this.subareaRepo.remove(subarea);
        return {
            message: 'Subarea deleted successfully',
        };
    }
};
exports.SubareaService = SubareaService;
exports.SubareaService = SubareaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subarea_entity_1.Subarea)),
    __param(1, (0, typeorm_1.InjectRepository)(area_entity_1.Area)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubareaService);
//# sourceMappingURL=subarea.service.js.map