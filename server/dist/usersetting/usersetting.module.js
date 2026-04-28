"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersettingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usersetting_entity_1 = require("./entities/usersetting.entity");
const usersetting_controller_1 = require("./usersetting.controller");
const usersetting_service_1 = require("./usersetting.service");
let UsersettingModule = class UsersettingModule {
};
exports.UsersettingModule = UsersettingModule;
exports.UsersettingModule = UsersettingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usersetting_entity_1.Usersetting])
        ],
        providers: [
            usersetting_service_1.UsersettingService
        ],
        controllers: [
            usersetting_controller_1.UsersettingController
        ],
        exports: [
            usersetting_service_1.UsersettingService,
            typeorm_1.TypeOrmModule
        ]
    })
], UsersettingModule);
//# sourceMappingURL=usersetting.module.js.map