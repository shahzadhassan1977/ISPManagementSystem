"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const role_entity_1 = require("../auth/entities/role.entity");
const user_role_entity_1 = require("../auth/entities/user-role.entity");
let UserService = class UserService {
    userRepo;
    roleRepo;
    userRoleRepo;
    constructor(userRepo, roleRepo, userRoleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.userRoleRepo = userRoleRepo;
    }
    async create(createUserDto) {
        const userpassword = createUserDto.password ?? '';
        const hashed = await bcrypt.hash(userpassword, 10);
        const user = this.userRepo.create({
            email: createUserDto.email,
            password: hashed,
            name: createUserDto.name,
            isActive: createUserDto.isActive,
            isDeleted: createUserDto.isDeleted,
            createdAt: createUserDto.createdAt,
        });
        return this.userRepo.save(user);
    }
    async findAll() {
        return this.userRepo.find({
            select: {
                userid: true,
                email: true,
                name: true,
                isActive: true,
                isDeleted: true,
                createdAt: true,
            },
            relations: [
                'userRoles',
                'userRoles.role',
                'userRoles.role.rolePermissions',
                'userRoles.role.rolePermissions.permission',
            ],
        });
    }
    async findOne(id) {
        const userid = id ?? 0;
        const user = await this.userRepo.findOne({
            where: { userid },
            relations: [
                'userRoles',
                'userRoles.role',
                'userRoles.role.rolePermissions',
                'userRoles.role.rolePermissions.permission',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findOneByEmail(email) {
        const user = await this.userRepo.findOne({
            where: { email: email },
            relations: [
                'userRoles',
                'userRoles.role',
                'userRoles.role.rolePermissions',
                'userRoles.role.rolePermissions.permission',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, dto) {
        const user = await this.findOne(id);
        if (dto.email) {
            const existing = await this.userRepo.findOne({
                where: { email: dto.email },
            });
            if (existing && existing.userid !== id) {
                throw new common_1.BadRequestException('Email already in use');
            }
            user.email = dto.email;
            user.name = dto.name;
            user.isActive = dto.isActive;
            user.isDeleted = dto.isDeleted;
        }
        if (dto.password) {
            user.password = await bcrypt.hash(dto.password, 10);
        }
        await this.userRepo.save(user);
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepo.remove(user);
        return {
            message: 'User deleted successfully',
        };
    }
    async assignRoleToUser(userId, roleId) {
        const user = await this.userRepo.findOne({
            where: { userid: userId },
        });
        const role = await this.roleRepo.findOne({
            where: { roleid: roleId },
        });
        if (!user || !role) {
            throw new Error('User or Role not found');
        }
        const userRole = this.userRoleRepo.create({
            user,
            role,
        });
        const exists = await this.userRoleRepo.findOne({
            where: { user: { userid: userId }, role: { roleid: roleId } },
        });
        if (exists)
            return exists;
        return await this.userRoleRepo.save(userRole);
    }
    async assignMultipleRoles(userId, roleIds) {
        const user = await this.userRepo.findOne({
            where: { userid: userId },
        });
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRoleRepo.delete({
            user: { userid: userId },
        });
        const roles = await this.roleRepo.findBy({
            roleid: (0, typeorm_2.In)(roleIds),
        });
        const userRoles = roles.map((role) => this.userRoleRepo.create({
            user,
            role,
        }));
        return await this.userRoleRepo.save(userRoles);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map