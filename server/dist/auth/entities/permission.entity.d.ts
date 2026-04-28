import { RolePermission } from './role-permission.entity';
export declare class Permission {
    permissionid: number;
    name: string;
    rolePermissions: RolePermission[];
}
