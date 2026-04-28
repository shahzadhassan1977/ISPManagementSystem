import { UserRole } from "../../auth/entities/user-role.entity";
export declare class User {
    userid: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    userRoles: UserRole[];
}
