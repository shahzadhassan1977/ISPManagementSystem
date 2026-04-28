import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<import("../auth/entities/role.entity").Role> | undefined;
    findAll(): Promise<import("../auth/entities/role.entity").Role[]> | undefined;
    findOne(id: string): Promise<import("../auth/entities/role.entity").Role> | undefined;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("../auth/entities/role.entity").Role> | undefined;
    remove(id: string): Promise<{
        message: string;
    }> | undefined;
    assignPermission(assignPermissionDto: AssignPermissionDto): Promise<import("../auth/entities/role-permission.entity").RolePermission[]>;
}
