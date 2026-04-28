import { Repository } from 'typeorm';
import { Role } from '../auth/entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from '../auth/entities/permission.entity';
import { RolePermission } from '../auth/entities/role-permission.entity';
export declare class RoleService {
    private roleRepo;
    private permissionRepo;
    private rolePermissionRepo;
    dataSource: any;
    constructor(roleRepo: Repository<Role>, permissionRepo: Repository<Permission>, rolePermissionRepo: Repository<RolePermission>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    update(id: number, dto: UpdateRoleDto): Promise<Role>;
    remove(id: number): Promise<{
        message: string;
    }>;
    assignPermissionToRole(roleId: number, permissionId: number): Promise<RolePermission>;
    assignMultiplePermissions(roleId: number, permissionIds: number[]): Promise<RolePermission[]>;
}
