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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const typeorm_2 = require("typeorm");
let PaymentService = class PaymentService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        const payment = this.repo.create({
            ...dto,
            customer: { customerid: dto.customerId },
            subscription: { subscriptionid: dto.subscriptionId },
        });
        return this.repo.save(payment);
    }
    findAll() {
        return this.repo.find({
            relations: [
                'customer',
                'subscription',
                'subscription.product',
            ],
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: [
                'customer',
                'subscription',
                'subscription.product',
            ],
        });
    }
    update(id, dto) {
        return this.repo.update(id, {
            ...dto,
            customer: dto.customerId ? { customerid: dto.customerId } : undefined,
            subscription: dto.subscriptionId
                ? { subscriptionid: dto.subscriptionId }
                : undefined,
        });
    }
    remove(id) {
        return this.repo.delete(id);
    }
    findByCustomer(customerId) {
        return this.repo.find({
            relations: [
                'customer',
                'subscription',
                'subscription.product',
            ],
            where: { customer: { customerid: customerId } },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map