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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const subscriptiondetail_service_1 = require("../subscriptiondetail/subscriptiondetail.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
const update_subscription_dto_1 = require("./dto/update-subscription.dto");
const create_subscriptiondetail_dto_1 = require("../subscriptiondetail/dto/create-subscriptiondetail.dto");
const update_subscriptiondetail_dto_1 = require("../subscriptiondetail/dto/update-subscriptiondetail.dto");
const subscription_dto_1 = require("./dto/subscription.dto");
let SubscriptionController = class SubscriptionController {
    service;
    SubscriptiondetailService;
    constructor(service, SubscriptiondetailService) {
        this.service = service;
        this.SubscriptiondetailService = SubscriptiondetailService;
    }
    async create(dto) {
        const subscriptionDto = new create_subscription_dto_1.CreateSubscriptionDto();
        subscriptionDto.customerId = dto.customerId;
        subscriptionDto.productId = dto.productId;
        subscriptionDto.startDate = new Date(dto.startDate);
        subscriptionDto.renewalDate = new Date(dto.renewalDate);
        subscriptionDto.billingCycle = dto.billingCycle;
        subscriptionDto.status = dto.status;
        subscriptionDto.isActive = dto.isActive;
        subscriptionDto.isDeleted = dto.isDeleted;
        const result = await this.service.create(subscriptionDto);
        const subscriptiondetailDto = new create_subscriptiondetail_dto_1.CreateSubscriptiondetailDto();
        subscriptiondetailDto.installationDate = new Date(dto.installationDate);
        subscriptiondetailDto.installationCharges = dto.installationCharges;
        subscriptiondetailDto.wireCharges = dto.wireCharges;
        subscriptiondetailDto.deviceCharges = dto.deviceCharges;
        subscriptiondetailDto.splitterCharges = dto.splitterCharges;
        subscriptiondetailDto.fee = dto.fee;
        subscriptiondetailDto.otherCharges = dto.otherCharges;
        subscriptiondetailDto.paid = dto.paid;
        subscriptiondetailDto.remainingBalance = dto.remainingBalance;
        subscriptiondetailDto.deviceMac = dto.deviceMac;
        subscriptiondetailDto.userId = dto.userId;
        subscriptiondetailDto.password = dto.password;
        subscriptiondetailDto.staticIP = dto.staticIP;
        subscriptiondetailDto.olt = dto.olt;
        subscriptiondetailDto.oltPort = dto.oltPort;
        subscriptiondetailDto.splitter = dto.splitter;
        subscriptiondetailDto.splitterPort = dto.splitterPort;
        subscriptiondetailDto.subscriptionId = result.subscriptionid;
        subscriptiondetailDto.linemanId = dto.linemanId;
        subscriptiondetailDto.areaRecoveryOfficerId = dto.areaRecoveryOfficerId;
        subscriptiondetailDto.isActive = dto.isActive;
        subscriptiondetailDto.isDeleted = dto.isDeleted;
        const subscriptionDetail = await this.SubscriptiondetailService.create(subscriptiondetailDto);
        console.log("Created subscription detail:", subscriptionDetail);
        console.log("Subscription creation result:", result);
        return result;
    }
    async findAll() {
        const result = await this.service.findAll();
        const subscriptions = await Promise.all(result.map(async (subscription) => {
            const subscriptionDetails = await this.SubscriptiondetailService.findOne(subscription.subscriptionid);
            return {
                ...subscription,
                subscriptiondetails: subscriptionDetails || null,
            };
        }));
        return subscriptions;
    }
    findAllByCustomer(customerId) {
        if (customerId)
            return this.service.findByCustomer(+customerId);
        return this.service.findAll();
    }
    async findOne(id) {
        const result = await this.service.findOne(+id);
        console.log("Fetched subscription:", result);
        return result;
    }
    async update(id, dto) {
        const subscriptionDto = new update_subscription_dto_1.UpdateSubscriptionDto();
        subscriptionDto.subscriptionid = id;
        subscriptionDto.customerId = dto.customerId;
        subscriptionDto.productId = dto.productId;
        subscriptionDto.startDate = new Date(dto.startDate);
        subscriptionDto.renewalDate = new Date(dto.renewalDate);
        subscriptionDto.billingCycle = dto.billingCycle;
        subscriptionDto.status = dto.status;
        subscriptionDto.isActive = dto.isActive;
        subscriptionDto.isDeleted = dto.isDeleted;
        const result = await this.service.update(+id, subscriptionDto);
        const subscriptiondetailDto = new update_subscriptiondetail_dto_1.UpdateSubscriptiondetailDto();
        subscriptiondetailDto.id = dto.id;
        subscriptiondetailDto.installationDate = new Date(dto.installationDate);
        subscriptiondetailDto.installationCharges = dto.installationCharges;
        subscriptiondetailDto.wireCharges = dto.wireCharges;
        subscriptiondetailDto.deviceCharges = dto.deviceCharges;
        subscriptiondetailDto.splitterCharges = dto.splitterCharges;
        subscriptiondetailDto.fee = dto.fee;
        subscriptiondetailDto.otherCharges = dto.otherCharges;
        subscriptiondetailDto.paid = dto.paid;
        subscriptiondetailDto.remainingBalance = dto.remainingBalance;
        subscriptiondetailDto.deviceMac = dto.deviceMac;
        subscriptiondetailDto.userId = dto.userId;
        subscriptiondetailDto.password = dto.password;
        subscriptiondetailDto.staticIP = dto.staticIP;
        subscriptiondetailDto.olt = dto.olt;
        subscriptiondetailDto.oltPort = dto.oltPort;
        subscriptiondetailDto.splitter = dto.splitter;
        subscriptiondetailDto.splitterPort = dto.splitterPort;
        subscriptiondetailDto.subscriptionId = id;
        subscriptiondetailDto.linemanId = dto.linemanId;
        subscriptiondetailDto.areaRecoveryOfficerId = dto.areaRecoveryOfficerId;
        subscriptiondetailDto.isActive = dto.isActive;
        subscriptiondetailDto.isDeleted = dto.isDeleted;
        const subscriptionDetail = await this.SubscriptiondetailService.update(subscriptiondetailDto.id, subscriptiondetailDto);
        return "Update successful";
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/:customerId"),
    __param(0, (0, common_1.Query)("customerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "findAllByCustomer", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subscription_dto_1.SubscriptionDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "remove", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)("subscriptions"),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService,
        subscriptiondetail_service_1.SubscriptiondetailService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map