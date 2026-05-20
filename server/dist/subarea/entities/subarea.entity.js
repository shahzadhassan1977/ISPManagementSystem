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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subarea = void 0;
const typeorm_1 = require("typeorm");
const area_entity_1 = require("../../area/entities/area.entity");
const employeesubarea_entity_1 = require("../../employeesubarea/entities/employeesubarea.entity");
let Subarea = class Subarea {
    subareaid;
    name;
    createdAt;
    updatedAt;
    isActive;
    isDeleted;
    areaId;
    area;
    employees;
};
exports.Subarea = Subarea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subarea.prototype, "subareaid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subarea.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Subarea.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Subarea.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Subarea.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Subarea.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subarea.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => area_entity_1.Area, (a) => a.subAreas, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'areaId' }),
    __metadata("design:type", area_entity_1.Area)
], Subarea.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employeesubarea_entity_1.EmployeeSubarea, (esa) => esa.subarea),
    __metadata("design:type", Array)
], Subarea.prototype, "employees", void 0);
exports.Subarea = Subarea = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name', 'area'])
], Subarea);
//# sourceMappingURL=subarea.entity.js.map