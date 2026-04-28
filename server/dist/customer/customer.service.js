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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_2 = require("typeorm");
let CustomerService = class CustomerService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        const customer = this.repo.create(dto);
        return this.repo.save(customer);
    }
    findAll() {
        return this.repo.find({
            relations: ['subscriptions', 'payments'],
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { customerid: id },
            relations: ['subscriptions', 'payments'],
        });
    }
    update(id, dto) {
        return this.repo.update({ customerid: id }, dto);
    }
    remove(id) {
        return this.repo.delete({ customerid: id });
    }
    search(term) {
        console.log('Searching for term:', term);
        return this.repo
            .createQueryBuilder('customer')
            .where('customer.name LIKE :term', { term: `%${term}%` })
            .orWhere('customer.phone LIKE :term', { term: `%${term}%` })
            .orWhere('customer.cnic LIKE :term', { term: `%${term}%` })
            .getMany();
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map