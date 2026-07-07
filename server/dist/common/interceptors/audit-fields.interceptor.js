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
exports.AuditFieldsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuditFieldsInterceptor = class AuditFieldsInterceptor {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const method = req?.method?.toUpperCase();
        if (req?.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
            const user = await this.resolveUser(req);
            const userId = this.extractUserId(user);
            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
                if (req.body.createdAt == null || req.body.createdAt === '') {
                    req.body.createdAt = new Date();
                }
                if (req.body.updatedAt == null || req.body.updatedAt === '') {
                    req.body.updatedAt = new Date();
                }
                if (req.body.createdBy == null || req.body.createdBy === '') {
                    req.body.createdBy = userId;
                }
                if (req.body.updatedBy == null || req.body.updatedBy === '') {
                    req.body.updatedBy = userId;
                }
            }
        }
        return next.handle();
    }
    async resolveUser(req) {
        if (req?.user) {
            return req.user;
        }
        const authHeader = req?.headers?.authorization;
        if (typeof authHeader !== 'string') {
            return null;
        }
        const [, token] = authHeader.split(' ');
        if (!token) {
            return null;
        }
        try {
            return await this.jwtService.verifyAsync(token);
        }
        catch {
            return null;
        }
    }
    extractUserId(user) {
        if (!user) {
            return 0;
        }
        const raw = user.userId ?? user.sub ?? user.userid ?? user.id ?? user.user?.id;
        const parsed = Number(raw);
        return Number.isFinite(parsed) ? parsed : 0;
    }
};
exports.AuditFieldsInterceptor = AuditFieldsInterceptor;
exports.AuditFieldsInterceptor = AuditFieldsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuditFieldsInterceptor);
//# sourceMappingURL=audit-fields.interceptor.js.map