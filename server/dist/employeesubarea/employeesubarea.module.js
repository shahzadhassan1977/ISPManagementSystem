"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSubareaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employeesubarea_entity_1 = require("./entities/employeesubarea.entity");
const employeesubarea_service_1 = require("./employeesubarea.service");
const employeesubarea_controller_1 = require("./employeesubarea.controller");
let EmployeeSubareaModule = class EmployeeSubareaModule {
};
exports.EmployeeSubareaModule = EmployeeSubareaModule;
exports.EmployeeSubareaModule = EmployeeSubareaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employeesubarea_entity_1.EmployeeSubarea])
        ],
        providers: [
            employeesubarea_service_1.EmployeeSubareaService
        ],
        controllers: [
            employeesubarea_controller_1.EmployeeSubareaController
        ],
        exports: [
            employeesubarea_service_1.EmployeeSubareaService,
            typeorm_1.TypeOrmModule,
        ]
    })
], EmployeeSubareaModule);
//# sourceMappingURL=employeesubarea.module.js.map