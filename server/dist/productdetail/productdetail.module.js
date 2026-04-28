"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductdetailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productdetail_entity_1 = require("./entities/productdetail.entity");
const productdetail_service_1 = require("./productdetail.service");
const productdetail_controller_1 = require("./productdetail.controller");
let ProductdetailModule = class ProductdetailModule {
};
exports.ProductdetailModule = ProductdetailModule;
exports.ProductdetailModule = ProductdetailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([productdetail_entity_1.Productdetail])
        ],
        providers: [
            productdetail_service_1.ProductdetailService
        ],
        controllers: [
            productdetail_controller_1.ProductdetailController
        ],
        exports: [
            productdetail_service_1.ProductdetailService,
            typeorm_1.TypeOrmModule
        ]
    })
], ProductdetailModule);
//# sourceMappingURL=productdetail.module.js.map