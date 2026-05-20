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
exports.Subscriptiondetail = void 0;
const typeorm_1 = require("typeorm");
const subscription_entity_1 = require("../../subscription/entities/subscription.entity");
let Subscriptiondetail = class Subscriptiondetail {
    id;
    installationDate;
    installationCharges;
    wireCharges;
    deviceCharges;
    splitterCharges;
    fee;
    otherCharges;
    paid;
    remainingBalance;
    deviceMac;
    userId;
    password;
    staticIP;
    olt;
    oltPort;
    splitter;
    splitterPort;
    subscriptionId;
    subscription;
    linemanId;
    areaRecoveryOfficerId;
    createdAt;
    updatedAt;
    isActive;
    isDeleted;
};
exports.Subscriptiondetail = Subscriptiondetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Subscriptiondetail.prototype, "installationDate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "installationCharges", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "wireCharges", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "deviceCharges", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "splitterCharges", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "fee", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "otherCharges", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "remainingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "deviceMac", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "staticIP", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "olt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "oltPort", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "splitter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscriptiondetail.prototype, "splitterPort", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "subscriptionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_entity_1.Subscription, (s) => s.subscriptiondetails, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'subscriptionId' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], Subscriptiondetail.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "linemanId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subscriptiondetail.prototype, "areaRecoveryOfficerId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Subscriptiondetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Subscriptiondetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Subscriptiondetail.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Subscriptiondetail.prototype, "isDeleted", void 0);
exports.Subscriptiondetail = Subscriptiondetail = __decorate([
    (0, typeorm_1.Entity)()
], Subscriptiondetail);
//# sourceMappingURL=subscriptiondetail.entity.js.map