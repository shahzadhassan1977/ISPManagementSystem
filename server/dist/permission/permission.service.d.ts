import { Permission } from '../auth/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionService {
    private permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    update(id: number, dto: UpdatePermissionDto): Promise<Permission>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
