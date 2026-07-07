import { RolePermission } from './role-permission.entity';
export declare class Permission {
    permissionid: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    isActive: boolean;
    isDeleted: boolean;
    rolePermissions: RolePermission[];
}
