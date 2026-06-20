import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("../auth/entities/permission.entity").Permission>;
    findAll(): Promise<import("../auth/entities/permission.entity").Permission[]>;
    findOne(id: string): Promise<import("../auth/entities/permission.entity").Permission>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<import("../auth/entities/permission.entity").Permission>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
