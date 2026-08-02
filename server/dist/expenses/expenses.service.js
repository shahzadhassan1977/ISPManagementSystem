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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const expense_entity_1 = require("./entities/expense.entity");
const typeorm_2 = require("typeorm");
let ExpensesService = class ExpensesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        const expense = this.repo.create({
            ...dto,
            expenseDate: new Date(dto.expenseDate),
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt),
        });
        return this.repo.save(expense);
    }
    findAll() {
        return this.repo.find({
            order: { id: 'DESC' },
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
        });
    }
    update(id, dto) {
        return this.repo.update(id, {
            ...dto,
        });
    }
    remove(id) {
        return this.repo.delete(id);
    }
    search(term) {
        const normalized = `%${term}%`;
        return this.repo
            .createQueryBuilder('expense')
            .where('expense.title LIKE :term', { term: normalized })
            .orWhere('expense.description LIKE :term', { term: normalized })
            .orWhere('expense.category LIKE :term', { term: normalized })
            .orWhere('expense.status LIKE :term', { term: normalized })
            .orderBy('expense.createdAt', 'DESC')
            .getMany();
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map