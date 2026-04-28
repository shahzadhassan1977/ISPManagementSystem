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
exports.EmployeeSubarea = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../../employee/entities/employee.entity");
const subarea_entity_1 = require("../../subarea/entities/subarea.entity");
let EmployeeSubarea = class EmployeeSubarea {
    id;
    employee;
    subarea;
};
exports.EmployeeSubarea = EmployeeSubarea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeSubarea.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeSubarea.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subarea_entity_1.Subarea, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'subareaId' }),
    __metadata("design:type", subarea_entity_1.Subarea)
], EmployeeSubarea.prototype, "subarea", void 0);
exports.EmployeeSubarea = EmployeeSubarea = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['employee', 'subarea'])
], EmployeeSubarea);
//# sourceMappingURL=employeesubarea.entity.js.map