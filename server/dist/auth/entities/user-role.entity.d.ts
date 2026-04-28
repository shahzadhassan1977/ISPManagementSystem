import { Role } from './role.entity';
import { User } from '../../user/entities/user.entity';
export declare class UserRole {
    id: number;
    user: User;
    role: Role;
}
