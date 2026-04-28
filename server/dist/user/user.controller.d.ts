import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User> | undefined;
    findAll(): Promise<import("./entities/user.entity").User[]> | undefined;
    findOne(id: string): Promise<import("./entities/user.entity").User> | undefined;
    findOneByEmail(searchUserDto: SearchUserDto): Promise<import("./entities/user.entity").User> | undefined;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User> | undefined;
    remove(id: string): Promise<{
        message: string;
    }> | undefined;
    assignRole(assignRoleDto: AssignRoleDto): Promise<import("../auth/entities/user-role.entity").UserRole[]>;
}
