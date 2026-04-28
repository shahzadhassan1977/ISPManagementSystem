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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const log_service_1 = require("../services/log.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let LoggingInterceptor = class LoggingInterceptor {
    logQueue;
    logService;
    constructor(logQueue, logService) {
        this.logQueue = logQueue;
        this.logService = logService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, params, query, ip } = request;
        const safeBody = { ...body };
        if (safeBody.password)
            delete safeBody.password;
        const user = request.user;
        const startTime = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(async (responseData) => {
            const response = context.switchToHttp().getResponse();
            const data = {
                method,
                url,
                userId: user?.userId,
                ip,
                requestBody: safeBody,
                responseBody: JSON.stringify(responseData).slice(0, 1000),
                statusCode: response.statusCode,
                duration: Date.now() - startTime,
            };
            await this.logQueue.add('log', data, { attempts: 3, backoff: 5000, });
        }), (0, rxjs_1.catchError)(async (error) => {
            const errorData = {
                method,
                url,
                userId: user?.userId,
                ip,
                requestBody: safeBody,
                statusCode: error?.status || 500,
                errorMessage: error?.message,
                duration: Date.now() - startTime,
            };
            await this.logQueue.add('log', errorData, { attempts: 3, backoff: 5000, });
            throw error;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('log-queue')),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        log_service_1.LogService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map