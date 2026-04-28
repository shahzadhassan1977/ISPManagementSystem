import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../auth/entities/role.entity';
import { UserRole } from '../auth/entities/user-role.entity';
export declare class UserService {
    private userRepo;
    private roleRepo;
    private userRoleRepo;
    constructor(userRepo: Repository<User>, roleRepo: Repository<Role>, userRoleRepo: Repository<UserRole>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(id: number, dto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
    assignRoleToUser(userId: number, roleId: number): Promise<UserRole>;
    assignMultipleRoles(userId: number, roleIds: number[]): Promise<UserRole[]>;
}
