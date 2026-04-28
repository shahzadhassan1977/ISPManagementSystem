"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptiondetailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subscriptiondetail_entity_1 = require("./entities/subscriptiondetail.entity");
const subscriptiondetail_service_1 = require("./subscriptiondetail.service");
const subscriptiondetail_controller_1 = require("./subscriptiondetail.controller");
let SubscriptiondetailModule = class SubscriptiondetailModule {
};
exports.SubscriptiondetailModule = SubscriptiondetailModule;
exports.SubscriptiondetailModule = SubscriptiondetailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([subscriptiondetail_entity_1.Subscriptiondetail])
        ],
        providers: [
            subscriptiondetail_service_1.SubscriptiondetailService
        ],
        controllers: [
            subscriptiondetail_controller_1.SubscriptiondetailController
        ],
        exports: [
            subscriptiondetail_service_1.SubscriptiondetailService,
            typeorm_1.TypeOrmModule
        ]
    })
], SubscriptiondetailModule);
//# sourceMappingURL=subscriptiondetail.module.js.map