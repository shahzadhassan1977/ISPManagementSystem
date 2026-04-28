import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';
export declare class Role {
    roleid: number;
    name: string;
    userRoles: UserRole[];
    rolePermissions: RolePermission[];
}
