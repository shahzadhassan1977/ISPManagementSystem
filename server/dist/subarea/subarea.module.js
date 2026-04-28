"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubareaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subarea_entity_1 = require("./entities/subarea.entity");
const subarea_controller_1 = require("./subarea.controller");
const subarea_service_1 = require("./subarea.service");
const area_module_1 = require("../area/area.module");
const area_entity_1 = require("../area/entities/area.entity");
let SubareaModule = class SubareaModule {
};
exports.SubareaModule = SubareaModule;
exports.SubareaModule = SubareaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subarea_entity_1.Subarea, area_entity_1.Area]),
            area_module_1.AreaModule,
        ],
        controllers: [subarea_controller_1.SubareaController],
        providers: [subarea_service_1.SubareaService],
        exports: [subarea_service_1.SubareaService, typeorm_1.TypeOrmModule],
    })
], SubareaModule);
//# sourceMappingURL=subarea.module.js.map