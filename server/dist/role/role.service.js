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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../auth/entities/role.entity");
const permission_entity_1 = require("../auth/entities/permission.entity");
const role_permission_entity_1 = require("../auth/entities/role-permission.entity");
let RoleService = class RoleService {
    roleRepo;
    permissionRepo;
    rolePermissionRepo;
    dataSource;
    constructor(roleRepo, permissionRepo, rolePermissionRepo) {
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
        this.rolePermissionRepo = rolePermissionRepo;
    }
    async create(createRoleDto) {
        const role = this.roleRepo.create({
            name: createRoleDto.name,
            isActive: createRoleDto.isActive ?? true,
            isDeleted: createRoleDto.isDeleted ?? false,
        });
        return this.roleRepo.save(role);
    }
    async findAll() {
        return this.roleRepo.find({
            select: {
                roleid: true,
                name: true,
            },
            relations: [
                'rolePermissions',
                'rolePermissions.permission',
            ]
        });
    }
    async findOne(id) {
        const roleid = id ?? 0;
        const role = await this.roleRepo.findOne({
            where: { roleid },
            relations: [
                'rolePermissions',
                'rolePermissions.permission',
            ],
        });
        if (!role) {
            throw new common_1.NotFoundException('User not found');
        }
        return role;
    }
    async update(id, dto) {
        const role = await this.findOne(id);
        if (dto.name) {
            const existing = await this.roleRepo.findOne({
                where: { name: dto.name },
            });
            if (existing && existing.roleid !== id) {
                throw new common_1.BadRequestException('Role already in use');
            }
            role.name = dto.name;
        }
        await this.roleRepo.save(role);
        return this.findOne(id);
    }
    async remove(id) {
        const role = await this.findOne(id);
        await this.roleRepo.remove(role);
        return {
            message: 'Role deleted successfully',
        };
    }
    async assignPermissionToRole(roleId, permissionId) {
        const role = await this.roleRepo.findOne({
            where: { roleid: roleId },
        });
        const permission = await this.permissionRepo.findOne({
            where: { permissionid: permissionId },
        });
        if (!role || !permission) {
            throw new Error('Role or Permission not found');
        }
        const rolePermission = this.rolePermissionRepo.create({
            role,
            permission,
        });
        const exists = await this.rolePermissionRepo.findOne({
            where: { role: { roleid: roleId }, permission: { permissionid: permissionId } },
        });
        if (exists)
            return exists;
        return await this.rolePermissionRepo.save(rolePermission);
    }
    async assignMultiplePermissions(roleId, permissionIds) {
        const role = await this.roleRepo.findOne({
            where: { roleid: roleId },
        });
        if (!role) {
            throw new Error('Role not found');
        }
        await this.rolePermissionRepo.delete({
            role: { roleid: roleId },
        });
        const permissions = await this.permissionRepo.findBy({
            permissionid: (0, typeorm_2.In)(permissionIds),
        });
        const rolePermissions = permissions.map((permission) => this.rolePermissionRepo.create({
            role,
            permission,
        }));
        return await this.rolePermissionRepo.save(rolePermissions);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(2, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map