"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const employee_controller_1 = require("./employee.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const subarea_entity_1 = require("../subarea/entities/subarea.entity");
const subarea_module_1 = require("../subarea/subarea.module");
const employeesubarea_module_1 = require("../employeesubarea/employeesubarea.module");
const employeesubarea_entity_1 = require("../employeesubarea/entities/employeesubarea.entity");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee, subarea_entity_1.Subarea, employeesubarea_entity_1.EmployeeSubarea,]),
            subarea_module_1.SubareaModule,
            employeesubarea_module_1.EmployeeSubareaModule,
        ],
        controllers: [employee_controller_1.EmployeeController],
        providers: [employee_service_1.EmployeeService],
        exports: [employee_service_1.EmployeeService, typeorm_1.TypeOrmModule],
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map