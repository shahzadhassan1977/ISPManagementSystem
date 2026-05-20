import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';
export declare class Role {
    roleid: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    userRoles: UserRole[];
    rolePermissions: RolePermission[];
}
