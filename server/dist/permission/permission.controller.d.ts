import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("../auth/entities/permission.entity").Permission> | undefined;
    findAll(): Promise<import("../auth/entities/permission.entity").Permission[]> | undefined;
    findOne(id: string): Promise<import("../auth/entities/permission.entity").Permission> | undefined;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<import("../auth/entities/permission.entity").Permission> | undefined;
    remove(id: string): Promise<{
        message: string;
    }> | undefined;
}
