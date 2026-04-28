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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const api_log_entity_1 = require("../entities/api-log.entity");
const typeorm_2 = require("typeorm");
let LogService = class LogService {
    logRepo;
    constructor(logRepo) {
        this.logRepo = logRepo;
    }
    async create(logData) {
        try {
            const safeBody = logData.responseBody;
            if (safeBody.password)
                delete safeBody.password;
            const log = this.logRepo.create(logData);
            await this.logRepo.save(log);
        }
        catch (err) {
            if (err instanceof typeorm_2.QueryFailedError) {
                console.error('SQL Query:', err.query);
                console.error('Parameters:', err.parameters);
                console.error('Log Save Failed:', err.driverError.message);
            }
        }
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(api_log_entity_1.ApiLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LogService);
//# sourceMappingURL=log.service.js.map