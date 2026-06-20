import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<import("../auth/entities/role.entity").Role>;
    findAll(): Promise<import("../auth/entities/role.entity").Role[]>;
    findOne(id: string): Promise<import("../auth/entities/role.entity").Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("../auth/entities/role.entity").Role>;
    remove(id: string): Promise<{
        message: string;
    }>;
    assignPermission(assignPermissionDto: AssignPermissionDto): Promise<import("../auth/entities/role-permission.entity").RolePermission[]>;
}
