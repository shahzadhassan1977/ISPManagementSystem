"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalsettingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const portalsetting_entity_1 = require("./entities/portalsetting.entity");
const portalsetting_service_1 = require("./portalsetting.service");
const portalsetting_controller_1 = require("./portalsetting.controller");
let PortalsettingModule = class PortalsettingModule {
};
exports.PortalsettingModule = PortalsettingModule;
exports.PortalsettingModule = PortalsettingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([portalsetting_entity_1.Portalsetting])
        ],
        providers: [
            portalsetting_service_1.PortalsettingService
        ],
        controllers: [
            portalsetting_controller_1.PortalsettingController
        ],
        exports: [
            portalsetting_service_1.PortalsettingService,
            typeorm_1.TypeOrmModule
        ]
    })
], PortalsettingModule);
//# sourceMappingURL=portalsetting.module.js.map